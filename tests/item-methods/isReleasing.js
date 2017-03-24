(function (window) {

  var Muuri = window.Muuri;
  var Simulator = window.Simulator;

  QUnit.module('Item methods - isReleasing');

  QUnit.test('item.isReleasing() should return true if the item is being released', function (assert) {

    assert.expect(6);

    var done = assert.async();
    var container = utils.createGridElements().container;
    var grid = new Muuri(container, {dragEnabled: true});
    var item = grid.getItems()[0];

    assert.strictEqual(item.isReleasing(), false, 'An item should not be in releasing state when it`s not being released');

    utils.dragElement({
      element: item.getElement(),
      move: {
        left: 100,
        top: 100
      },
      onStart: function () {
        assert.strictEqual(item.isReleasing(), false, 'An item should not be in releasing state when dragging starts');
      },
      onStop: function () {
        assert.strictEqual(item.isReleasing(), false, 'An item should not be in releasing state when dragging');
      },
      onRelease: function () {
        assert.strictEqual(item.isReleasing(), true, 'An item should be in releasing state during release');
      }
    });

    grid.on('dragReleaseStart', function () {
      assert.strictEqual(item.isReleasing(), true, 'An item should be in releasing state right after it has been released');
    });

    grid.on('dragReleaseEnd', function () {
      assert.strictEqual(item.isReleasing(), false, 'An item should not be in releasing state right after releasing has ended');
      grid.destroy();
      container.parentNode.removeChild(container);
      done();
    });

  });

})(this);