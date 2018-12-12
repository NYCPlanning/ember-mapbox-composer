import DS from 'ember-data';

const { Model, attr } = DS;

/**
  Model for related sources

  @public
  @class SourceModel
*/
export default Model.extend({
  meta: attr(),
});
