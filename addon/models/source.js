import DS from 'ember-data';

const { Model } = DS;

export default Model.extend({
  type: DS.attr('string'),
  'source-layers': DS.attr(),
  tiles: DS.attr(),
  tileSize: DS.attr('number'),
});
