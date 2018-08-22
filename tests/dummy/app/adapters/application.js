import DS from 'ember-data';
import config from '../config/environment';

const { host } = config;
const { JSONAPIAdapter } = DS;

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = host;
  namespace = 'v1';
}
