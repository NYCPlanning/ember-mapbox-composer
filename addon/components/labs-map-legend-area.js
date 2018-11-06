import Component from '@ember/component';
import { tagName, classNames, attribute } from '@ember-decorators/component';
import layout from '../templates/components/labs-map-legend-point';

export default 
@tagName('svg')
@classNames('legend-icon', 'line-array')
class LabsMapLegendPointComponent extends Component {
  layout = layout;

  style = {};

  @attribute height = 10;
  @attribute width = 17;
  @attribute viewBox = '0 0 17 10';
  @attribute preserveAspectRatio = 'xMinYMid';

  didInsertElement() {
    const groupElement = this.element.querySelector('rect');
    const style = this.get('style');
    Object.entries(style).forEach(([attr, value]) => {
      groupElement.setAttribute(attr, value);
    });
  }
}
