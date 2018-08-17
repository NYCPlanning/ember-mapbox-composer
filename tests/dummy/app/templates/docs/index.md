# What is Ember Mapbox Composer?

Ember Mapbox Composer is a web mapping addon created by [NYC Planning Labs](https://planninglabs.nyc/) on the shoulders of [Ember MapboxGL](https://github.com/kturney/ember-mapbox-gl) and, of course, [Mapbox](https://www.mapbox.com) itself. Composer makes it easier to implement and maintain many large groups of MapboxGL [layers](https://www.mapbox.com/mapbox-gl-js/style-spec/#layers) by providing a simple data structure called a `layer-group`, providing data models for binding state to MapboxGL and storing state on a server, and providing a component for rendering `layer-groups`.

## What is a 'layer-group'?

There needed to be a way to group together layers in MapboxGL. Mapbox's style specification is highly customizable, but it also requires creating multiple style layers for the same data source. For example, if I create a world map with national boundaries, I would need to create a one style layer for the vector lines and another style layer for the vector fills. This addon allows developers to compose layers in a single object and manipulate it as needed.
