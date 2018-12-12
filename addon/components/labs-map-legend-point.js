import Component from '@ember/component';
import layout from '../templates/components/labs-map-legend-point';

export default Component.extend({
  init(...args) {
    this._super(...args);

    this.set('style', {});
  },

  layout,

  tagName: 'svg',
  classNames: ['legend-icon', 'line-array'],
  attributeBindings: ['height', 'width', 'viewBox', 'preserveAspectRatio'],

  height: 10,
  width: 17,
  viewBox: '0 0 17 10',
  preserveAspectRatio: 'xMinYMid',

  didInsertElement() {
    const groupElement = this.element.querySelector('circle');
    const style = this.get('style');
    Object.entries(style).forEach(([attr, value]) => {
      groupElement.setAttribute(attr, value);
    });
  },
});
