import DS from 'ember-data';
import config from '../config/environment';

const { host } = config;
const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({
  host,
  namespace: 'v1',
});
