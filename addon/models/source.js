import DS from 'ember-data';
import { attr, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

/**
  Model for related sources

  @public
  @class SourceModel
*/
export default class SourceModel extends Model {
  @attr() meta;
}
