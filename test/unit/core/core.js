var hyI = new hy();


suite('Core', function() {
    var node;

    setup(function () {
        node = document.createElement('div');
        document.body.appendChild(node);
    });

    teardown(function () {
        document.body.removeChild(node);
    });

    suite('new hy()', function () {


        test('Should create instance of hy', function() {
            assert.instanceOf(hyI, hy);
        });
        test('_initialised should be true', function () {
            assert.isOk(hyI._initialised);
        });
        test('Constants are loaded', function() {
            assert.isObject(hyI._c);
        });
        test('Display is an instance of hy.Display', function() {
            assert.instanceOf(hyI._display, hy.Display);
        });
    });
});
