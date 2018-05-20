import Route from '@ember/routing/route';
import normalizeCartoVectors from 'cartobox-promises-utility/utils/normalize-carto-vectors';

export default Route.extend({
  model() {
    return {
      sources: this.store.findAll('source'),
      layerGroups: this.store.findAll('layer-group'),
      layers: this.store.peekAll('layer'),
    }
  }
});
