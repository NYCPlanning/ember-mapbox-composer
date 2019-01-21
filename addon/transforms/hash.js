import DS from 'ember-data';
import EmberObject from '@ember/object';

const { Transform } = DS;

export default Transform.extend({
  deserialize(serialized) {
    return EmberObject.create(serialized);
  }
});
