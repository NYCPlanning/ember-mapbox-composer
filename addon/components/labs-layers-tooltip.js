import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import { required } from '@ember-decorators/argument/validation';
import { type } from '@ember-decorators/argument/type';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/labs-layers-tooltip';

/**
  Renders a component when a "tooltipable" layer is hovered. 
  
  ```js
    // routes/application.js
    import Route from '@ember/routing/route';

    export default class ApplicationRoute extends Route {
      async model() {
        return [{
          id: 'roads',
          layers: [{
            id: 'highways',
            tooltipable: true,
            style: {
              type: 'line',
              paint: {
                'line-fill': 'orange',
              },
            },
          }, {
            id: 'streets',
            tooltipable: true,
            style: {
              type: 'line',
              paint: {
                'line-fill': 'blue',
              },
            },
          }]
        }];
      }
    }

  ```
  ```handlebars
    {{!-- routes/application.hbs --}}
    {{#labs-map as |map|}} 
      {{#map.labs-layers layerGroups=model as |layers|}}
        {{#layers.tooltip as |tip|}}
          This text appears over the tooltipable layer on mouseover. Yields a hash with two properties:
           - {{tip.feature}}
           - {{tip.layer}}
        {{/layers.tooltip}}
      {{/map}}
    {{/labs-map}}
  ```

  Behavior can be overridden with a different component by passing the name of a local component to `labs-layers`.

  @class LabsLayersTooltipComponent
  @public
*/
export default class LabsLayersTooltipComponent extends Component {
  @computed('top', 'left', 'offset')
  get style() {
    const position = this.getProperties('top', 'left', 'offset');
    return htmlSafe(`
      top: ${position.top + position.offset}px; 
      left: ${position.left + position.offset}px; 
      pointer-events: none;
    `);
  }

  layout = layout

  /**
    Offset of tooltip div element in pixels.
    @argument offset
    @type Number
  */
  @argument
  offset = 20;

  /**
    Top offset of tooltip div in pixels.
    @argument top
    @type Number
  */
  @required
  @argument
  @type('number')
  top = 0;

  /**
    Left offset of tooltip div in pixels.
    @argument left
    @type Number
  */
  @required
  @argument
  @type('number')
  left = 0;

  /**
    Geographic feature of the layer that is hovered when onLayerMouseMove is fired.
    @argument feature
    @type Object
    @private
  */
  @argument
  feature;

  /**
    Layer that is hovered when onLayerMouseMove is fired.
    @argument layer
    @type Object
    @private
  */
  @argument
  layer;
}
