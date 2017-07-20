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
        test('A valid canvas should not throw an error', function() {
            var resize = function() {
                hyI._display.resizeCanvas(hyI._display.canvas, 50, 50);
            }
            expect(resize).to.not.throw(TypeError);
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
});
