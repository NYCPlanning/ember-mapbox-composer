import DS from 'ember-data';
import { attr } from '@ember-decorators/data';

const { Model } = DS;

export default class SourceModel extends Model {
  @attr() meta;
}
