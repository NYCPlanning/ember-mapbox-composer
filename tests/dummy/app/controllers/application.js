import Controller from '@ember/controller';

// defaults
const center = [-73.92, 40.7], zoom = 10, bearing = 0, pitch = 0;

export default Controller.extend({
  initMapOptions: {
    center,
    zoom,
    pitch,
    bearing,
    style: 'https://raw.githubusercontent.com/NYCPlanning/labs-gl-style/master/data/style.json',
    transformRequest(url) {
      window.XMLHttpRequest = window.XMLHttpRequestNative;
      return { url };
    } 
  },
});
