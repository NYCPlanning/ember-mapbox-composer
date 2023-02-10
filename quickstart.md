# Getting Started

This guide will help you get started with Ember Mapbox Composer. After completion you will have a collection of layer-groups visible on a map.

---

## Installation

1. Install the addon:
  ```
  ember install ember-mapbox-composer
  ```

1. Install Mapbox GL:
  ```
  yarn add mapbox-gl
  ```

---

## Get a map into your template

1. Add `mapbox-gl` to the `ENV` object in `config/environment.js`:
  ```js
  'mapbox-gl': {
    accessToken: '',
    map: {
      style: 'https://layers-api-staging.planninglabs.nyc/v1/base/style.json',
    },
  },
  ```

1. Add the `labs-map` component to `application.hbs`
  ```
  {{labs-map id="map"}}
  ```
  This will render a map with the environment’s base style.

  (Remember to give `#map` a height in your CSS.)

## Get Layer Groups into the Ember data model

1. Add `host` to the `ENV` object, pointing to the Labs Layers API:
  ```js
  host: 'https://layers-api-staging.planninglabs.nyc',
  ```

1. Generate an application adapter if it does not exist:
  ```
  ember g adapter application
  ```

1. Set up `adapters/application.js` to query to the Layers API:
  ```js
  import DS from 'ember-data';
  import fetch from 'fetch';
  import config from '../config/environment';

  const { host } = config;
  const { JSONAPIAdapter } = DS;

  export default class ApplicationAdapter extends JSONAPIAdapter {
    host = host;
    namespace = 'v1';

    async query(store, type, query = {}) {
      const URL = this.buildURL(type.modelName);

      return fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(query),
      }).then(blob => blob.json());

    }
  }
  ```

1. Generate an application route if it does not exist:
  ```
  ember g route application
  ```

1. In `routes/application.js` define which layer groups will be queried from the API:
  ```
  async model() {
    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        { id: 'subway', visible: true },
        { id: 'floodplain-efirm2007', visible: true },
      ],
    });

    return {
      layerGroups,
    }
  }
  ```

---

## Render Layer Groups on the map

1. Add `labs-layers` component to the map:
  ```
  {{#labs-map id='map' as |map|}}
    {{map.labs-layers layerGroups=model.layerGroups}}
  {{/labs-map}}
  ```
