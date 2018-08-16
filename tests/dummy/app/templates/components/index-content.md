## Motive
Large mapping applications involve many layers whose state can be changed through an API, user interaction, or query parameters. Mapbox Composer is a set of Ember models and components that can make it easier to manage the state of layers without losing the flexibility of MapboxGL.

It works like this: you serve out a collection of layer-groups from a JSON file or API, load them into Ember's data store, and pass these models to a `labs-layers` component. These layers will be rendered according to an opinionated data structure we've designed, along with some other goodies. 

What are "layer-groups"? This is where we get opinionated. Layer-groups are a simple schema for grouping together MapboxGL layers. MapboxGL itself does not have a native API for grouping together layers. This is important because conceptually, users and developers do not care that a map of cities can include many layers including: line boundaries, fills, labels, and so on. With layer-groups, it's easier to reason about this and move on with creating an awesome user experience.

Once loaded, all layer-groups will be available to you from the data store for manipulation at any point with data bindings setup properly. This means you can toggle the visibility of any particular layer-group, and it will manage the internals of delegating visibility to those layers.
