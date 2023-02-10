import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupTest } from 'ember-qunit';

module('Unit | Service | layer-groups', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:layer-groups');
    assert.ok(service);
  });

  test('it lists visibleLayerGroups when none loaded', function(assert) {
    let service = this.owner.lookup('service:layer-groups');

    assert.equal(service.get('visibleLayerGroups').length, 0);
  });

  test('can initialize with initializeObservers', async function(assert) {
    let store = this.owner.lookup('service:store');
    let service = this.owner.lookup('service:layer-groups');

    await run(() => {
      store.pushPayload('layer-group', {
        data: [{
          type: 'layer-group',
          id: 1,
          attributes: {
            visible: true
          }
        }, {
          type: 'layer-group',
          id: 2,
          attributes: {
            visible: true
          }
        }, {
          type: 'layer-group',
          id: 3,
          attributes: {
            visible: false
          }
        }]
      });
    });

    service.initializeObservers(store.peekAll('layer-group'));
    assert.ok(service);
  });

  test('it lists visibleLayerGroups when some visible', async function(assert) {
    let service = this.owner.lookup('service:layer-groups');
    let store = this.owner.lookup('service:store');

    await run(() => {
      store.pushPayload('layer-group', {
        data: [{
          type: 'layer-group',
          id: 1,
          attributes: {
            visible: true
          }
        }, {
          type: 'layer-group',
          id: 2,
          attributes: {
            visible: true
          }
        }, {
          type: 'layer-group',
          id: 3,
          attributes: {
            visible: false
          }
        }]
      });
    });

    const layerGroups = store.peekAll('layer-group');

    service.initializeObservers(layerGroups);
    assert.equal(service.get('visibleLayerGroups').length, 2);
  });


  test('it updates state based on visibility', async function(assert) {
    let service = this.owner.lookup('service:layer-groups');
    let store = this.owner.lookup('service:store');

    await run(() => {
      store.pushPayload('layer-group', {
        data: [{
          type: 'layer-group',
          id: 1,
          attributes: {
            visible: true,
            'layer-visibility-type': 'binary'
          }
        }, {
          type: 'layer-group',
          id: 2,
          attributes: {
            visible: true,
            'layer-visibility-type': 'binary'
          }
        }, {
          type: 'layer-group',
          id: 3,
          attributes: {
            visible: false,
            'layer-visibility-type': 'binary'
          }
        }]
      });
    });

    const layerGroups = store.peekAll('layer-group');

    service.initializeObservers(layerGroups);
    assert.equal(service.get('visibleLayerGroups').length, 2);

    await run(() => {layerGroups.get('firstObject').set('visible', false);});

    assert.equal(service.get('visibleLayerGroups').length, 1);
  });

  test('it updates substate based on filter, selection', async function(assert) {
    let service = this.owner.lookup('service:layer-groups');
    let store = this.owner.lookup('service:store');

    await run(() => {
      store.pushPayload('layer-group', {
        data: [{
          type: 'layer-group',
          id: 1,
          attributes: {
            visible: true,
            'layer-visibility-type': 'singleton'
          },
          relationships: [{
            type: 'layer',
            id: 1,
          }]
        }, {
          type: 'layer-group',
          id: 2,
          attributes: {
            visible: true,
            'layer-visibility-type': 'binary'
          }
        }, {
          type: 'layer-group',
          id: 3,
          attributes: {
            visible: false,
            'layer-visibility-type': 'binary'
          }
        }],
        included: [{
          type: 'layer',
          id: 1,
          attributes: {}
        }],
      });
    });

    const layerGroups = store.peekAll('layer-group');

    service.initializeObservers(layerGroups);
    assert.equal(service.get('visibleLayerGroups').length, 2);

    assert.ok(typeof service.get('visibleLayerGroups') !== 'string');
  });
});
