import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { get } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
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
export default class LayersComponent extends Component {
  layout=layout

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
  map;

  /**
    Whether layergroups should have interactivity (highlighting and clicking).  Useful for temporarily disabling interactivity during drawing mode.

    @argument interactivity
    @type boolean
  */
  interactivity = true;

  /**
    Collection of layer-group objects
    @argument layerGroups
    @type Array
  */
  layerGroups;

  /**
    Event fired on layer click. Scoped to individual layers. Returns the mouse event and clicked layer.
    @argument onLayerClick
    @type Action
  */
  onLayerClick = () => {};

  /**
    Event fired on layer mousemove. Scoped to individual layers. Returns the mouse event and found layer.
    @argument onLayerMouseMove
    @type Action
  */
  onLayerMouseMove = () => {};

  /**
    Event fired on layer mouseleave. Scoped to individual layers. Returns the mouse event and found layer.
    @argument onLayerMouseLeave
    @type Action
  */
  onLayerMouseLeave = () => {};

  /**
    Event fired on layer highlight. Returns the id of the layer that is being highlighted.
    @argument onLayerHighlight
    @type Action
  */
  onLayerHighlight = () => {};

  /**
    Name of local component to use in place of default component.
    @argument toolTipComponent
    @type String
  */
  toolTipComponent = 'labs-layers-tooltip';


  hoveredFeature;

  @computed('hoveredFeature')
  get hoveredLayer() {
    const feature = this.get('hoveredFeature');

    if (feature) {
      return this.get('layers')
        .findBy('id', feature.layer.id);
    }

    return null;
  }

  @computed('layerGroups.@each.layers')
  get layers() {
    return ArrayProxy.create({
      content: this.get('layerGroups')
        .map((layerGroup) => get(layerGroup, 'layers'))
        .reduce((accumulator, current) => {
          const layers = current.toArray();

          return [...accumulator, ...layers];
        }, [])
    });
  }

  mousePosition = null;

  @action
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
  }

  @action
  async handleLayerMouseMove(e) {
    const map = this.get('map');
    const interactivity = this.get('interactivity');

    const { features: [feature] } = e;

    const foundLayer = this.get('layers').findBy('id', feature.layer.id);

    const { highlightable, tooltipable } =
      foundLayer.getProperties('highlightable', 'tooltipable');

    // this layer-specific event should always be called
    // if it's available
    const mouseMoveEvent = this.get('onLayerMouseMove');
    if (mouseMoveEvent && feature) {
      mouseMoveEvent(e, foundLayer);
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

      this.set('mousePosition', e.point);

      if (isNew) {
        const highlightEvent = this.get('onLayerHighlight');
        if (highlightEvent && feature) {
          // if this is different from the currently highlighted feature
          highlightEvent(e, foundLayer);
        }

        // only stitch if it's for highlighting and new
        // query for features of a given source
        try {
          const { geometry } = await this.get('stitchHoveredTiles').perform(feature);
          feature.geometry = geometry;
        } 
        catch (e) {
          // do nothing
        }

        // set the hovered feature
        this.set('hoveredFeature', feature);

        map.getSource('hovered-feature').setData(feature);
        map.setLayoutProperty('highlighted-feature', 'visibility', 'visible');
      }

      map.getCanvas().style.cursor = 'pointer';
    }
  }

  @restartableTask()
  stitchHoveredTiles = function*(feature) {
    const map = this.get('map');

    yield timeout(5);

    warn(`Missing ID in properties for ${feature.layer.source}`, feature.properties.id, { 
      id: 'ember-mapbox-composer.id-missing' 
    });

    // require an id for stitching
    if (!feature.properties.id) this.cancel();

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
  }

  @action
  handleLayerMouseLeave() {
    const map = this.get('map');
    this.set('hoveredFeature', null);
    map.getCanvas().style.cursor = ''
    this.setProperties({
      hoveredFeature: null,
      mousePosition: null,
    });

    map.setLayoutProperty('highlighted-feature', 'visibility', 'none');

    const mouseLeaveEvent = this.get('onLayerMouseLeave');

    if (mouseLeaveEvent) {
      mouseLeaveEvent();
    }
  }
}
