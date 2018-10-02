import DS from 'ember-data';
import EmberObject from '@ember/object';

const { Transform } = DS;

export default class extends Transform {
  deserialize(serialized) {
    return EmberObject.create(serialized);
  }
}
