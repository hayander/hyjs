suite('Display', function() {
    var c;

    suite('hy.Display.createCanvas', function() {
        var currentCanvas;
        setup(function() {
            currentCanvas      = hyI._display.canvas;
            hyI._display.canvas = hyI._display.createCanvas(45, 32);
        });


        test('should create instance of hy.Display', function() {
            assert.instanceOf(hyI._display, hy.Display);
        });
        test('Old DOM object should be deleted', function() {
            assert.notDeepEqual(currentCanvas, hyI._display.canvas);
        });
        test('Should have set a specific size for canvas', function() {
            assert.equal(hyI._display.canvas.width, 45);
            assert.equal(hyI._display.canvas.height, 32);
        });


    });
    suite('hy.Display.resizeCanvas', function() {


        test('Expect an error if an invalid canvas is supplied', function() {
            var resize = function() {
                hyI._display.resizeCanvas({}, 2, 1);
            }
            expect(resize).to.throw(TypeError);
        });
        test('Should resize the canvas', function() {
            var oldW = hyI._display.canvas.width;
            var oldH = hyI._display.canvas.height;
            hyI._display.resizeCanvas(hyI._display.canvas, 22, 44);
            assert.notEqual(hyI._display.canvas.height, oldW);
            assert.notEqual(hyI._display.canvas.height, oldH);
            assert.equal(hyI._display.canvas.width, 22);
            assert.equal(hyI._display.canvas.height, 44);
        });
    });
    suite('hy.Display._canDraw', function() {
        test('Should be false if not stroking or filling', function() {
            hyI.unsetStroke();
            hyI.unsetFill();
            assert.equal(hyI._display._canDraw(), false);
        });
        test('Should be false if only stroking but stroke is set to empty', function() {
            hyI.setStroke(hyI.STYLE.EMPTY);
            hyI.unsetFill();
            assert.equal(hyI._display._canDraw(), false);
        });
        test('Should be false if only filling but fill is set to empty', function() {
            hyI.setFill(hyI.STYLE.EMPTY);
            hyI.unsetStroke();
            assert.equal(hyI._display._canDraw(), false);
        });
        test('Should be false if stroking and filling but both set to empty', function() {
            hyI.setStroke(hyI.STYLE.EMPTY);
            hyI.setFill(hyI.STYLE.EMPTY);
            assert.equal(hyI._display._canDraw(), false);
        });
        test('Should be false if only checking stroke and stroke is not set', function() {
            hyI.setStroke(hyI.STYLE.EMPTY);
            hyI.setFill('#FF0000');
            assert.equal(hyI._display._canDraw(hyI.DRAW.STROKE), false);
        });
        test('Should be false if only checking fill and fill is not set', function() {
            hyI.setFill(hyI.STYLE.EMPTY);
            hyI.setStroke('#FF0000');
            assert.equal(hyI._display._canDraw(hyI.DRAW.FILL), false);
        });
        test('Should be true if only stroking and is set correctly', function() {
            hyI.setStroke('#FFFFFF');
            hyI.unsetFill();
            assert.equal(hyI._display._canDraw(), true);
        });
        test('Should be true if only filling and is set correctly', function() {
            hyI.setFill('#FFFFFF');
            hyI.unsetStroke();
            assert.equal(hyI._display._canDraw(), true);
        });
        test('Should be true if stroking and filling and 1 is set correctly', function() {
            hyI.setStroke('#FFFFFF');
            hyI.setFill(hyI.STYLE.EMPTY);
            assert.equal(hyI._display._canDraw(), true);
        });
        test('Should be true if stroking and filling and both are set correctly', function() {
            hyI.setStroke('#0000FF');
            hyI.setFill('#FF0000');
            assert.equal(hyI._display._canDraw(), true);
        });
        test('Should be true if only checking fill and fill is set', function() {
            hyI.setStroke(hyI.STYLE.EMPTY);
            hyI.setFill('#FF0000');
            assert.equal(hyI._display._canDraw(hyI.DRAW.FILL), true);
        });
    })
});
