import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const layerGroups = await this.store.query('layer-group', {});
    const { meta } = layerGroups;

    return {
      layerGroups,
      meta,
    };
  },
});
