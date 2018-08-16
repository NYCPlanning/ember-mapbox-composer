import Model from 'ember-data/model';
import { computed } from '@ember-decorators/object';
import { attr, belongsTo } from '@ember-decorators/data';
import { alias } from '@ember-decorators/object/computed';
import { copy } from '@ember/object/internals';
import { set } from '@ember/object';
import { assign } from '@ember/polyfills';
import EmberObject from '@ember/object';

export default class LayerModel extends Model.extend({}) {
  constructor(...args) {
    super(...args);

    this.set('style', EmberObject.create(this.get('style')));

    if (!this.get('style.layout')) this.set('style.layout', {});

    this.delegateVisibility();
    this.addObserver('layerGroup.visible', this, 'delegateVisibility');
  }

  delegateVisibility() {
    const visible = this.get('layerGroup.visible');

    if (this.get('layerVisibilityType') === 'singleton') {
      if (this.get('position') === 1 && this.get('layerGroup.visible')) {
        this.set('visibility', true);
      } else {
        this.set('visibility', false);
      }
    } else {
      this.set('visibility', visible);
    }
  }

  @belongsTo('layer-group') layerGroup

  @attr('number', { defaultValue: -1 }) position;
  @attr('string', { defaultValue: 'boundary_country' }) before
  @attr('string') displayName;
  @attr({ defaultValue: () => ({}) }) style
  @attr('boolean', { defaultValue: false }) highlightable;
  @attr('boolean', { defaultValue: false }) tooltipable
  @attr('string', { defaultValue: '' }) tooltipTemplate

  @alias('style.paint') paint;
  @alias('style.layout') layout;
  @alias('layerGroup.layerVisibilityType') layerVisibilityType;

  @computed('style.{paint,layout,filter}')
  get mapboxGlStyle() {
    return this.get('style');
  }

  // getter and setter for filter
  // accepts array
  @computed('style.filter')
  get filter() {
    return this.get('style.filter');
  }
  set filter(filter) {
    this.set('style', assign({}, this.get('style'), { filter }));
  }

  // getter and setter for visibility
  // accepts true or false
  // mapbox property that actually determines visibility
  // this also must check that parent visibility is true
  @computed('layout.visibility')
  get visibility() {
    return this.get('layout.visibility') === 'visible';
  }
  set visibility(value) {
    const parentVisibilityState = value && this.get('layerGroup.visible');
    const visibility = (parentVisibilityState ? 'visible' : 'none');
    const layout = copy(this.get('layout'));

    if (layout) {
      set(layout, 'visibility', visibility);
      this.set('layout', layout);
    }
  }
}
