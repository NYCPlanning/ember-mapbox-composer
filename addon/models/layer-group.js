import Model from 'ember-data/model';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias, mapBy } from '@ember/object/computed';
import DS from 'ember-data';

const { hasMany, attr } = DS;

/**
  Model for layer groups.
  Describes a collection of layers which are references here as a has-many relationship.
  Delegates state of certain properties, like visiblity, to child layers.
  Includes other helpful metadata.

  @public
  @class LayerModel
*/
export default Model.extend({
  init(...args) {
    this._super(...args);

    // update registry for aggregate state service
    this.set('layerGroupService.layerGroupRegistry', this.get('layerGroupService.layerGroupRegistry').concat(this));
  },

  layers: hasMany('layer', { async: false }),

  /**
    Abstraction for the visibility state of related layers. Mutations will fire updates to child layers.
    Simple modifies a property of the MapboxGL `layout` style property. Does not add or remove layers.

    @property visible
    @type Boolean
  */
  visible: attr('boolean', { defaultValue: true }),

  /**
    This property describes the visibility state
    of the associated layers. Layer groups can have:
      - singleton layers (only one or none layers are visible)
        the top-most layer is on by default
      - multi (many may be visible or none)
      - binary (all are visible or none are visible)

    @property layerVisibilityType
    @type String('singleton', 'multi', 'binary')
  */
  layerVisibilityType: attr('string', { defaultValue: 'binary' }),

  infoLink: attr('string', { defaultValue: '' }),
  titleTooltip: attr('string', { defaultValue: '' }),
  legendIcon: attr('string'),
  legendColor: attr('string'),
  legendConfig: attr(),

  /**
    A JSON object containing any number of keys and values to store metadata.

    @property meta
    @type Object
  */
  meta: attr(),

  legend: attr(),
  title: alias('legend.label'),

  /**
    Convenience property for a list of internal MapboxGL layer IDs.

    @property layerIds
    @type Array
  */
  layerIds: mapBy('layers', 'id'),

  // singleton only
  selected: computed('layers.@each.visibility', {
    get() {
      return this.get('layers').findBy('visibility', true);
    },
    set(id) {
      this.get('layers').setEach('visibility', false);
      this.get('layers').findBy('id', id).set('visibility', true);
    }
  }),

  /**
    This method finds a related layer and overwrites its paint object

    @method setPaintForLayer
    @param {String|Number} id ID of the layer-group's layer
    @param {Object} paint MapboxGL Style [paint](https://www.mapbox.com/mapbox-gl-js/style-spec/#layer-paint) object to override
  */
  setPaintForLayer(...args) {
    this._mutateLayerProperty('paint', ...args);
  },

  /**
    This method finds a related layer and overwrites its filter array

    @method setFilterForLayer
    @param {String|Number} id ID of the layer-group's layer
    @param {Object} filter MapboxGL Style [expressions array](https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions) to override
  */
  setFilterForLayer(...args) {
    this._mutateLayerProperty('filter', ...args);
  },

  /**
    This method finds a related layer and overwrites its layout object

    @method setLayoutForLayer
    @param {String|Number} id ID of the layer-group's layer
    @param {Object} layout MapboxGL Style [layout](https://www.mapbox.com/mapbox-gl-js/style-spec/#layout-property) object to override
  */
  setLayoutForLayer(...args) {
    this._mutateLayerProperty('layout', ...args);
  },

  /**
    This method hides all layers and shows only one

    @method showOneLayer
    @param {String|Number} id ID of the layer-group's layer
  */
  showOneLayer(id) {
    this.get('layers').forEach((layer) => {
      if (layer.get('id') === id) {
        layer.set('layout', {}/* visible */);
      }

      layer.set('layout', {}/* not visible */);
    });
  },

  /**
    This method generically mutates a property on a related layer

    @method _mutateLayerProperty
    @private
    @param {String|Number} property of the layer-group's layer
    @param {String|Number} layerID ID of the layer-group's layer
    @param {Object} value Value of Layer to override
  */
  _mutateLayerProperty(property, layerID, value) {
    const foundLayer = this.get('layers').findBy('id', layerID);
    if (!foundLayer) throw Error('No related layer with this ID.');

    foundLayer.set(property, value);
  },

  /**
    Internal for determining first occurence of a layer

    @property _firstOccurringLayer
    @type Number
    @private
  */
  _firstOccurringLayer: null,

  layerGroupService: service('layerGroups'),
});
