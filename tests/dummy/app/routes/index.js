// BEGIN-SNIPPET layer-group-route.js
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('layer-group', {
      'layer-groups': ['tax-lots', 'subway'],
    });
  },
});
// END-SNIPPET
