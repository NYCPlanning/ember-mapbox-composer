import DS from 'ember-data';
const { JSONAPIAdapter } = DS;

export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'v1';
  host = 'http://localhost:3000';

  _ajaxRequest() {
    if (window.FakeXMLHttpRequest) {
      window.XMLHttpRequest = window.XMLHttpRequestFake;
    }

    super._ajaxRequest(...arguments);
  }
}
