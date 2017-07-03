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

        // The reason why these tests run inside the suite() { ... } block is
        // because they test code that checks document.readyState.  If we waited
        // to run the test in test() { ... } the page would already be loaded and
        // readyState would be "completed".  By doing the tests things this way
        // readyState is "loading" and we can verify that the code is doing the
        // right thing during page load.

        var myhy = new hy();

        test('isLoaded should be true', function () {
            assert.ok(myhy.hyLoaded);
        });
    });
});
