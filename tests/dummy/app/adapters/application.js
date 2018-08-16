import DS from 'ember-data';
import { host } from '../config/environment';

const { JSONAPIAdapter } = DS;

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = host;
  namespace = 'v1';
}
