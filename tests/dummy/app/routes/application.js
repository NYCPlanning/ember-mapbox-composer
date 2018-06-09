import Route from '@ember/routing/route';
import normalizeCartoVectors from 'cartobox-promises-utility/utils/normalize-carto-vectors';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      sources: this.store.findAll('source')
        .then(sourceModels => normalizeCartoVectors(sourceModels.toArray())),
      layerGroups: this.store.findAll('layer-group'),
      layers: this.store.peekAll('layer'),
    });
  }
});
