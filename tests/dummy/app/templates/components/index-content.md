<p class="text-xl leading-normal lg:font-light lg:text-2xl mt-8 lg:-mr-8 lg:-ml-8 lg:text-justify">Ambitious mapping applications involve many map layers whose state can be changed through an API, user interaction, or query parameters. Mapbox Composer is a set of Ember models and components that make it easier to manage the state of layers without losing the flexibility of Mapbox GL.</p>

### Query for layers from from a JSON:API endpoint

```javascript
export default class ApplicationRoute extends Route {
  model() {
    return this.store.query('layer-group');
  }
}
```

### Map and manage those layers as a regular `mapbox-gl` map

```handlebars
{{#labs-map layerGroups=model as |map|}}
  {{!-- Add other features as you would with any `mapbox-gl` map --}}
{{/labs-map}}
```

### Control `layerGroups` as Ember Data models from anywhere in your application

```javascript
export default class ToggleComponent extends Component {
  @argument
  @required
  layerGroupModel;

  @action
  toggleVisibility() {
    this.get('layerGroupModel').toggleProperty('visible');
  }
}
```

## Background
NYC Planning Labs builds a [lot of mapping applications](https://planninglabs.nyc/projects/). These maps are often complicated and require the ability to show or hide groups of multiple layers. Configuration data for layers and their sources can growing unwieldy. It can be complicated to add new layers and difficult to migrate configuration between projects. Mapbox Composer was designed as a better, more reusable way to work with groups of map layers.

## It works like this&hellip;
You serve a collection of layer groups from a JSON file or API, load them into Ember's data store, and pass these models to a `labs-layers` component. The layer groups will be rendered according to Mapbox Composer's opinionated data structure.

## What are layer groups?
This is where Mapbox Composer gets opinionated.  A `layer-group` is a simple schema for grouping together Mapbox GL layers.

Mapbox GL itself does not have a native API for grouping layers. Mapbox's style specification is highly customizable, but it also requires creating multiple style layers for the same data source. For example, to create a world map with national boundaries, you need to create one style layer for the lines and another style layer for the fills.

This addon groups layers into single objects that can be manipulated as needed.Once loaded, layer groups are available from the data store. They can be manipulated at any point, with data bindings properly set up. This means you can, for instance, toggle the visibility of a particular `layer-group`, and it will manage the internals of delegating visibility to those layers.

Mapbox Composer's layer groups make managing layers easier so you can spend more time creating an awesome user experience.
