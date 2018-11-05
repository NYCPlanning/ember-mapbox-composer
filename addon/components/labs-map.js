import mapboxGlMap from 'ember-mapbox-gl/components/mapbox-gl';
import { argument } from '@ember-decorators/argument';
import { assign } from '@ember/polyfills';
import { get } from '@ember/object';
import { computed } from '@ember-decorators/object';
import layout from '../templates/components/labs-map';

export const highlightedFeatureLayer = {
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
};

/**
  Extends `mapbox-gl` component to yield `labs-layers` contextual component. Allows passage of layer-groups.

  ```js
  // routes/application.js
  import Route from '@ember/routing/route';

  export default class ApplicationRoute extends Route {
    async model() {
      return this.store.query('layer-group');
    }
  }

  ```
  ```handlebars
  {{!-- routes/application.hbs --}}
  {{labs-map layerGroups=model}}
  ```

  @class LabsMapComponent
  @public
*/
export default class MainMapComponent extends mapboxGlMap {
  init(...args) {
    super.init(...args);

    // if layerGroups are passed to the map, use the style from that
    if (this.get('layerGroups')) {
      const { 
        meta: {
          mapboxStyle 
        } 
      } = this.get('layerGroups') || {};

      if (mapboxStyle) assign(get(this, 'initOptions') || {}, { style: mapboxStyle });
    }
  }

  layout = layout;

  @computed('hoveredFeature')
  get hoveredFeatureSource() {
    const feature = this.get('hoveredFeature');
    return {
      type: 'geojson',
      data: feature,
    };
  }

  hoveredFeature = null;

  /**
    MapboxGL Style object for the hightlighted layer
    @argument highlightedFeatureLayer
    @type Object
  */
  @argument
  highlightedFeatureLayer = highlightedFeatureLayer;

  /**
    Collection of layer-group models (see: [DS.RecordArray](https://emberjs.com/api/ember-data/release/classes/DS.RecordArray)).
    Allows optional `meta` object with a `mapboxStyle` property which is passed to the mapbox-gl instance.
    @argument layerGroups
    @type DS.RecordArray
  */
  @argument
  layerGroups = null;

  _onLoad(map, ...args) {
    super._onLoad(map, ...args);

    // add source for highlighted-feature
    map
      .addSource('hovered-feature', this.get('hoveredFeatureSource'));
  }
}
