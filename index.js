'use strict';

module.exports = {
  name: require('./package').name,
  isDevelopingAddon() {
    return true;
  },
  options: {
    autoImport: {
      exclude: ['mapbox-gl', 'ember-mapbox-gl'],
    },
  },
};
