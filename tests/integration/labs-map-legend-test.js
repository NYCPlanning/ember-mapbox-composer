import { module, test } from 'qunit';
import { setupRenderingTest, pauseTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | labs-map-legend', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{labs-map-legend}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#labs-map-legend}}
        template block text
      {{/labs-map-legend}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it shows no tooltip by default', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('model', {
      items: [{
        type: 'line',
        style: {},
        label: 'test-label',
      }]
    });

    await render(hbs`{{labs-map-legend model=model}}`);

    const tooltip = await find('.tooltip');
    assert.equal(!!tooltip, false);

  });
});
