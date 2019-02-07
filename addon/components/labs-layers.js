import Component from '@ember/component';
import { computed } from '@ember/object';
import { get } from '@ember/object';
import { timeout, task } from 'ember-concurrency';
import turfUnion from '@turf/union';
import ArrayProxy from '@ember/array/proxy';
import { warn } from '@ember/debug';
import layout from '../templates/components/labs-layers';

/**
  Renders a collection of Mapbox Composer-compatible layer groups.

  ```js
  // routes/application.js
  import Route from '@ember/routing/route';

  export default class ApplicationRoute extends Route {
    async model() {
      return [{
        id: 'roads',
        layers: [{
          id: 'highways',
          style: {
            type: 'line',
            paint: {
              'line-fill': 'orange',
            },
          },
        }, {
          id: 'streets',
          style: {
            type: 'line',
            paint: {
              'line-fill': 'blue',
            },
          },
        }]
      }];
    }
  }

  ```
  ```handlebars
  {{!-- routes/application.hbs --}}
  {{#labs-map as |map|}}
    {{map.labs-layers layerGroups=model}}
  {{/labs-map}}
  ```

  @class LayersComponent
  @public
*/
export default Component.extend({
  layout,

  /**
    Reference to a instance of a MapboxGL map. Handled internally when using contextual components:

    ```
  {{#labs-map as |map|}}
    {{map.labs-layers layerGroups=model}}
  {{/labs-map}}
    ```
    @argument map
    @private
    @type MapboxGL Map Instance
  */
  map: null,

  /**
    Whether layergroups should have interactivity (highlighting and clicking).  Useful for temporarily disabling interactivity during drawing mode.

    @argument interactivity
    @type boolean
  */
  interactivity: true,

  /**
    Collection of layer-group objects
    @argument layerGroups
    @type Array
  */
  layerGroups: null,

  /**
    Event fired on layer click. Scoped to individual layers. Returns the mouse event and clicked layer.
    @argument onLayerClick
    @type Action
  */
  onLayerClick() {},

  /**
    Event fired on layer mousemove. Scoped to individual layers. Returns the mouse event and found layer.
    @argument onLayerMouseMove
    @type Action
  */
  onLayerMouseMove() {},

  /**
    Event fired on layer mouseleave. Scoped to individual layers. Returns the mouse event and found layer.
    @argument onLayerMouseLeave
    @type Action
  */
  onLayerMouseLeave() {},

  /**
    Event fired on layer highlight. Returns the id of the layer that is being highlighted.
    @argument onLayerHighlight
    @type Action
  */
  onLayerHighlight() {},

  /**
    Name of local component to use in place of default component.
    @argument toolTipComponent
    @type String
  */
  toolTipComponent: 'labs-layers-tooltip',


  hoveredFeature: null,

  hoveredLayer: computed('hoveredFeature', function() {
    const feature = this.get('hoveredFeature');

    if (feature) {
      return this.get('layers')
        .findBy('id', feature.layer.id);
    }

    return null;
  }),

  layers: computed('layerGroups.@each.layers', function() {
    return ArrayProxy.create({
      content: this.get('layerGroups')
        .map((layerGroup) => get(layerGroup, 'layers'))
        .reduce((accumulator, current) => {
          const layers = current.toArray();

          return [...accumulator, ...layers];
        }, [])
    });
  }),

  visibleLayerIds: computed('layers.@each.visibility', function() {
    return this.get('layers')
      .filterBy('visibility', true)
      .mapBy('id');
  }),

  mousePosition: null,


  stitchHoveredTiles: task(function*(feature) {
    const map = this.get('map');

    yield timeout(5);

    warn(`Missing ID in properties for ${feature.layer.source}`, feature.properties.id, { 
      id: 'ember-mapbox-composer.id-missing' 
    });

    // require an id for stitching
    if (!feature.properties.id) return feature;

    // query for features by source
    const featureFragments = map
      .querySourceFeatures(feature.layer.source, {
        sourceLayer: feature.layer['source-layer'], 
        filter: ['==', 'id', feature.properties.id],
      })
      .map(({ geometry, properties }) => ({ type: 'Feature', properties, geometry }));

    // we don't need to union if there is only one
    // we also don't want to slow down machines if there are too many
    if (featureFragments.length === 1 || featureFragments.length > 100) return feature;

    return featureFragments
      .reduce((acc, curr) => turfUnion(curr, (acc ? acc : curr)));
  }).restartable(),

  highlightFeatureTask: task(function*(e, feature) {
    // debounce this expensive task
    yield timeout(5);

    const map = this.get('map');
    const interactivity = this.get('interactivity');
    const foundLayer = this.get('layers').findBy('id', feature.layer.id);

    // this layer-specific event should always be called
    // if it's available
    const mouseMoveEvent = this.get('onLayerMouseMove');
    mouseMoveEvent(e, foundLayer);

    const {
      highlightable,
      tooltipable,
      clickable,
    } = foundLayer.getProperties('highlightable', 'tooltipable', 'clickable');

    if (clickable) {
      map.getCanvas().style.cursor = 'pointer';
    }

    // if layer is set for this behavior
    if ((highlightable || tooltipable) && interactivity) {
      const hoveredFeature = this.get('hoveredFeature');
      let isNew = true;
      if (hoveredFeature) {
        if ((feature.properties.id === hoveredFeature.properties.id) && (feature.layer.id === hoveredFeature.layer.id)) {
          isNew = false;
        }
      }

      if (isNew) {
        const highlightEvent = this.get('onLayerHighlight');
        // if this is different from the currently highlighted feature
        highlightEvent(e, foundLayer);

        // only stitch if it's for highlighting and new
        // query for features of a given source
        const { geometry } = yield this.get('stitchHoveredTiles').perform(feature);
        feature.geometry = geometry;

        // set the hovered feature
        this.set('hoveredFeature', feature);

        map.getSource('hovered-feature').setData(feature);

        if(feature.layer.type == "circle") {
          map.setLayoutProperty('highlighted-feature-circle', 'visibility', 'visible');
          map.setLayoutProperty('highlighted-feature-line', 'visibility', 'none');
        } else {
          map.setLayoutProperty('highlighted-feature-circle', 'visibility', 'none');
          map.setLayoutProperty('highlighted-feature-line', 'visibility', 'visible');
        }
      }
    }
  }).keepLatest(),

  actions: {
    async handleLayerMouseClick(e) {
      // TODO: stitch clicked feature
      const { features: [feature] } = e;
      const interactivity = this.get('interactivity');

      const foundLayer = this.get('layers').findBy('id', feature.layer.id);
      const layerClickEvent = this.get('onLayerClick');

      if ((layerClickEvent && feature) && interactivity) {
        try {
          const { geometry } = await this.get('stitchHoveredTiles').perform(feature);
          feature.geometry = geometry;
        } 
        catch (e) {
          // do nothing
        }
        layerClickEvent(feature, foundLayer);
      }
    },

    handleLayerMouseMove(e) {
      // only query the visible layers
      const layerIds = this.get('visibleLayerIds');
      const [feature] = this.map
        .queryRenderedFeatures(e.point, { layers: layerIds });

      this.set('mousePosition', e.point);

      if (feature) this.get('highlightFeatureTask').perform(e, feature);
    },

    handleLayerMouseLeave() {
      const map = this.get('map');
      this.set('hoveredFeature', null);
      map.getCanvas().style.cursor = ''
      this.setProperties({
        hoveredFeature: null,
        mousePosition: null,
      });

      map.setLayoutProperty('highlighted-feature-circle', 'visibility', 'none');
      map.setLayoutProperty('highlighted-feature-line', 'visibility', 'none');

      const mouseLeaveEvent = this.get('onLayerMouseLeave');

      if (mouseLeaveEvent) {
        mouseLeaveEvent();
      }
    },
  },
});
