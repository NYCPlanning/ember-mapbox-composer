import Model from 'ember-data/model';
import { computed } from '@ember-decorators/object';
import { attr, belongsTo } from '@ember-decorators/data';
import { alias } from '@ember-decorators/object/computed';
import { copy } from 'ember-copy';
import { set } from '@ember/object';
import { assign } from '@ember/polyfills';
import { next } from '@ember/runloop';

/**
  Model for individual layers. Belongs to a layer-group. May be called individually for state changes.

  @public
  @class LayerModel
*/
export default class LayerModel extends Model.extend({}) {
  constructor(...args) {
    super(...args);

    // enforce presence of blank object for mapboxGL validation
    if (!this.get('style.layout')) this.set('style.layout', {});

    // determine which is the first occurring layer
    // for testing, should check that a related layer group exists
    if (this.get('layerGroup') && !this.get('layerGroup._firstOccurringLayer')) {
      this.set('layerGroup._firstOccurringLayer', this.get('id'));
      this.set('position', 1);
    }

    this.delegateVisibility();
    this.addObserver('layerGroup.visible', this, 'delegateVisibility');
  }

  delegateVisibility() {
    const visible = this.get('layerGroup.visible');

    if (this.get('layerVisibilityType') === 'singleton') {
      if (this.get('position') === 1 && this.get('layerGroup.visible')) {
        next(() => this.set('visibility', true));
      } else {
        next(() => this.set('visibility', false));
      }
    } else {
      next(() => this.set('visibility', visible));
    }
  }

  @belongsTo('layer-group', { async: false }) layerGroup

  @attr('number', { defaultValue: -1 }) position;
  @attr('string', { defaultValue: 'boundary_country' }) before
  @attr('string') displayName;
  @attr('hash', { defaultValue: () => ({}) }) style

  /**
    Determines whether to fire mouseover events for the layer.
    @property highlightable
    @type Boolean
  */
  @attr('boolean', { defaultValue: false }) highlightable;

  /**
    Determines whether to fire click events for the layer.
    @property clickable
    @type Boolean
  */
  @attr('boolean', { defaultValue: false }) clickable;

  /**
    Determines whether to render positioned tooltip components for the layer.
    @property tooltipable
    @type Boolean
  */
  @attr('boolean', { defaultValue: false }) tooltipable

  /**
    Optional template for tooltips. Does not handle any rendering.
    @property tooltipTemplate
    @type String
  */
  @attr('string', { defaultValue: '' }) tooltipTemplate

  @alias('style.paint') paint;
  @alias('style.layout') layout;
  @alias('layerGroup.layerVisibilityType') layerVisibilityType;


  /**
    Computed alias that returns a newly built mapbox layer object. Necessary to maintain state bindings.
    @property mapboxGlStyle
    @type Object
    @private
  */
  @computed('style.{paint,layout,filter}')
  get mapboxGlStyle() {
    return this.get('style');
  }

  /**
    Getter and setter for filter. Array structure should follow Mapbox's [Expression](https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions) syntax.
    @property filter
    @type Array
  */
  @computed('style.filter')
  get filter() {
    return this.get('style.filter');
  }
  set filter(filter) {
    this.set('style', assign({}, this.get('style'), { filter }));
  }

  /** 
    Getter and setter for visibility. Mutates a Mapbox property that actually determines visibility. Depends on parent visibility.

    @property visibility
    @type Boolean
  */
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
