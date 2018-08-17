import Model from 'ember-data/model';
import { attr, hasMany } from '@ember-decorators/data';
import { mapBy } from '@ember-decorators/object/computed';
import { computed } from '@ember-decorators/object';

/**
  Model for layer groups. 
  Describes a collection of layers which are references here as a has-many relationship. 
  Delegates state of certain properties, like visiblity, to child layers. 
  Includes other helpful metadata.

  @public
  @class LayerModel
*/
export default class LayerGroupModel extends Model.extend({}) {
  @hasMany('layer', { async: false }) layers

  /**
    Abstraction for the visibility state of related layers. Mutations will fire updates to child layers. 
    Simple modifies a property of the MapboxGL `layout` style property. Does not add or remove layers.

    @property visible
    @type Boolean
  */
  @attr('boolean', { defaultValue: true }) visible

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
  @attr('string', { defaultValue: 'binary' }) layerVisibilityType
  @attr('string') title
  @attr('string', { defaultValue: '' }) titleTooltip
  @attr('string') legendIcon
  @attr('string') legendColor
  @attr('string') meta
  @attr() legendConfig

  /**
    Convenience property for a list of internal MapboxGL layer IDs. 

    @property layerIds
    @type Array
  */
  @mapBy('layers', 'id') layerIds;

  // singleton only
  @computed('layers.@each.visibility')
  get selected() {
    return this.get('layers').findBy('visibility', true);
  }
  set selected(id) {
    this.get('layers').setEach('visibility', false);
    this.get('layers').findBy('id', id).set('visibility', true);
  }

  showOneLayer(id) {
    this.get('layers').forEach((layer) => {
      if (layer.get('id') === id) {
        layer.set('layout', {}/* visible */);
      }

      layer.set('layout', {}/* not visible */);
    });
  }
}
