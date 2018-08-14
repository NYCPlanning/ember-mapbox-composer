import patchXMLHTTPRequest from './helpers/mirage-mapbox-gl-monkeypatch';
import mapboxStyle from './data/mapboxStyle';
import layerGroupSerializer from './helpers/custom-serializer';
import rawData from './fixtures/layer-groups';

export default function() {
  patchXMLHTTPRequest();
  // mirage/config.js
  this.passthrough('style.json');

  // this.namespace = 'api';

  this.get('/layer-groups', function() {
    const json = layerGroupSerializer(rawData);

    json.meta = {
      mapboxStyle
    };

    return json;
  });

  this.get('/sources');

  this.passthrough('mapbox://**');
  this.passthrough('https://raw.githubusercontent.com/**');
  this.passthrough('http://raw.githubusercontent.com/**');
  this.passthrough('https://tiles.planninglabs.nyc/**');
  this.passthrough('http://tiles.planninglabs.nyc/**');
  this.passthrough('https://planninglabs.carto.com/**');
  this.passthrough('http://planninglabs.carto.com/**');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
