'use strict';

module.exports = {
  name: 'ember-mapbox-composer',
  isDevelopingAddon() {
    return true;
  },
  options: {
    autoImport: {
      exclude: ['mapbox-gl', 'ember-mapbox-gl'],
    },
  },
};
