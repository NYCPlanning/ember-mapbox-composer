import mapboxGlMap from 'ember-mapbox-gl/components/mapbox-gl';
import { argument } from '@ember-decorators/argument';
import layout from '../templates/components/labs-map';

export default class MainMapComponent extends mapboxGlMap {
  constructor(...args) {
    super(...args);

    const { meta: { mapboxStyle } } = this.get('layerGroups') || {};

    if (mapboxStyle) this.set('initOptions.style', mapboxStyle);
  }

  layout = layout;

  @argument
  layerGroups = null;
}
