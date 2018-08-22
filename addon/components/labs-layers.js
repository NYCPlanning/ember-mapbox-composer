import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import { required } from '@ember-decorators/argument/validation';
import { Action } from '@ember-decorators/argument/types';
import { type } from '@ember-decorators/argument/type';
import { get } from '@ember/object';
import ArrayProxy from '@ember/array/proxy';
import layout from '../templates/components/labs-layers';

/**
  Renders a collection of composer-compatible layer groups.

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

  @class LabsLayersComponent
  @public
*/
export default class LayersComponent extends Component {
  constructor(...args) {
    super(...args);

    const map = this.get('map');

    // add source for highlighted-feature
    map
      .addSource('hovered-feature', this.get('hoveredFeatureSource'));
  }

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
  @required
  @argument
  map;

  /**
    Collection of layer-group objects
    @argument layerGroups
    @type Array
  */
  @required
  @argument
  layerGroups;

  /**
    Event fired on layer click. Scoped to individual layers. Returns the mouse event and clicked layer.
    @argument onLayerClick
    @type Action
  */
  @argument
  @type(Action)
  onLayerClick = () => {};

  /**
    Event fired on layer mousemove. Scoped to individual layers. Returns the mouse event and found layer.
    @argument onLayerMouseMove
    @type Action
  */
  @argument
  @type(Action)
  onLayerMouseMove = () => {};

  /**
    Event fired on layer mouseleave. Scoped to individual layers. Returns the mouse event and found layer.
    @argument onLayerMouseLeave
    @type Action
  */
  @argument
  @type(Action)
  onLayerMouseLeave = () => {};

  /**
    Event fired on layer highlight. Returns the id of the layer that is being highlighted.
    @argument onLayerHighlight
    @type Action
  */
  @argument
  @type(Action)
  onLayerHighlight = () => {};

  /**
    Name of local component to use in place of default component.
    @argument toolTipComponent
    @type String
  */
  @argument
  toolTipComponent = 'labs-layers-tooltip';

  /**
    MapboxGL Style object for the hightlighted layer
    @argument highlightedFeatureLayer
    @type Object
  */
  @argument
  highlightedFeatureLayer = {
    id: 'highlighted-feature',
    type: 'line',
    source: 'hovered-feature',
    paint: {
      'line-color': '#ffff00',
      'line-opacity': 0.3,
      'line-width': {
        stops: [
          [8, 4],
          [11, 7],
        ],
      },
    },
  }

  @computed('hoveredFeature')
  get hoveredFeatureSource() {
    const feature = this.get('hoveredFeature');
    return {
      type: 'geojson',
      data: feature,
    };
  }

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

  hoveredFeature = null;
  mousePosition = null;

  @action
  handleLayerMouseClick(e) {
    const [feature] = e.features;
    const foundLayer = this.get('layers').findBy('id', feature.layer.id);
    const layerClickEvent = this.get('onLayerClick');
    if (layerClickEvent && feature) {
      layerClickEvent(feature, foundLayer);
    }
  }

  @action
  handleLayerMouseMove(e) {
    const map = this.get('map');
    const [feature] = e.features;

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
    if (highlightable || tooltipable) {
      const hoveredFeature = this.get('hoveredFeature');

      let isNew = true;
      if (hoveredFeature) {
        if ((feature.id === hoveredFeature.id) && (feature.layer.id === hoveredFeature.layer.id)) {
          isNew = false;
        }
      }

      if (isNew) {
        const highlightEvent = this.get('onLayerHighlight');
        if (highlightEvent && feature) {
          // if this is different from the currently highlighted feature
          highlightEvent(e, foundLayer);
        }

        // set the hovered feature
        this.setProperties({
          hoveredFeature: feature,
          mousePosition: e.point,
        });

        map.getSource('hovered-feature').setData(feature);
      }
      map.getCanvas().style.cursor = 'pointer';
    }
  }

  @action
  handleLayerMouseLeave() {
    const map = this.get('map');
    this.set('hoveredFeature', null);
    map.getCanvas().style.cursor = '';

    this.setProperties({
      hoveredFeature: null,
      mousePosition: null,
    });

    const mouseLeaveEvent = this.get('onLayerMouseLeave');
    if (mouseLeaveEvent) {
      mouseLeaveEvent();
    }
  }
}
