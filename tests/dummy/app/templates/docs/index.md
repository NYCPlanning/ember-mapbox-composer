# What is Mapbox Composer?

Mapbox Composer is an [Ember](https://emberjs.com/) addon created by [NYC Planning Labs](https://planninglabs.nyc/) on the shoulders of [Ember Mapbox GL](https://github.com/kturney/ember-mapbox-gl) and [Mapbox](https://www.mapbox.com). Mapbox Composer makes it easier to implement and maintain a large number of Mapbox GL [layers](https://www.mapbox.com/mapbox-gl-js/style-spec/#layers) by providing:
- A simple data structure called a `layer-group`
- Data models for binding state to Mapbox GL and storing state on a server
- A `{{labs-layers}}` component for rendering layer groups

## What is a `layer-group`?
A `layer-group` is a simple schema for grouping together Mapbox GL layers.

Mapbox GL itself does not have a native API for grouping layers. Mapbox's style specification is highly customizable, but it also requires creating multiple style layers for the same data source. For example, to create a world map with national boundaries, you need to create one style layer for the lines and another style layer for the fills.

This addon groups layers into single objects that can be manipulated as needed. Once loaded, layer groups are available from the data store. They can be manipulated at any point, with data bindings properly set up. This means you can, for instance, toggle the visibility of a particular `layer-group`, and it will manage the internals of delegating visibility to those layers.
