import Route from '@ember/routing/route';
import normalizeCartoVectors from 'cartobox-promises-utility/utils/normalize-carto-vectors';
import { hash } from 'rsvp';

export default Route.extend({
  async model() {
    const layerGroups = await this.store.query('layer-group', {});
    const layers = this.store.peekAll('layer');
    const { meta } = layerGroups;

    return {
      layerGroups,
      meta,
    };
  }
});
