import DS from 'ember-data';
const { JSONAPIAdapter } = DS;

export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api'
}
