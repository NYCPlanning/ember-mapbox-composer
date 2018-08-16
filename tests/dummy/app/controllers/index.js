// BEGIN-SNIPPET layer-group-controller.js
import Controller from '@ember/controller';
import { computed } from '@ember/object';

// defaults
const center = [-73.92, 40.7], zoom = 10, bearing = 0, pitch = 0;

export default Controller.extend({
  initMapOptions: computed('model.meta', function() {
    return {
      center,
      zoom,
      pitch,
      bearing,
      style: this.get('model.meta.mapboxStyle'),
    };
  }),

  actions: {
    mapLoaded(e) {
      window.map = e;
    }
  }
});
// END-SNIPPET
