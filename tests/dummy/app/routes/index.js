// BEGIN-SNIPPET layer-group-route.js
import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    // await this.store.unloadAll();
    const layerGroups = await this.store.query('layer-group', {});
    const { meta } = layerGroups;

    return {
      layerGroups,
      meta,
    };
  },
});
// END-SNIPPET
