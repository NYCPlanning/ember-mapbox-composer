import mapboxGlMap from 'ember-mapbox-gl/components/mapbox-gl';
import { argument } from '@ember-decorators/argument';
import { assign } from '@ember/polyfills';
import { get } from '@ember/object';
import layout from '../templates/components/labs-map';

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

  /**
    Collection of layer-group models (see: [DS.RecordArray](https://emberjs.com/api/ember-data/release/classes/DS.RecordArray)).
    Allows optional `meta` object with a `mapboxStyle` property which is passed to the mapbox-gl instance.
    @argument layerGroups
    @type DS.RecordArray
  */
  @argument
  layerGroups = null;
}
