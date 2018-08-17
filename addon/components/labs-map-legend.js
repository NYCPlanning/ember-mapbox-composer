import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import layout from '../templates/components/labs-map-legend';

/**
  
  **DEPRECATED**

  Opinionated handler for created map legends. 
  Expects a layerConfig object with an `items` property. 
  `items` are an array of objects specific the SVG attributes of the legend item.

  ```js
// controller/application.js
import Controller from '@ember/routing/controller';

export default class ApplicationRoute extends Route {
  legendConfig = {
    "label":"Street Lines",
    "items":[
      {
        "type":"line",
        "label":"Mapped Street",
        "tooltip":"Tooltip information!",
        "style":{
          "fill":"none",
          "stroke": "rgba(50, 50, 50, 1)"
        }
      },
      {
        "type":"line",
        "label":"Street Treatment",
        "tooltip":"Tooltip information!",
        "style":{
          "fill":"none",
          "stroke":"rgba(84, 84, 84, 1)",
          "stroke-width":"0.5"
        }
      },
    ]
  }
}
  ```
  ```handlebars
{{labs-map-legend model=legendConfig}}
  ```
  @class LabsMapLegendComponent
  @deprecated
*/
export default class LabsMapLegendComponent extends Component {
  layout = layout;

  @argument
  model;
}
