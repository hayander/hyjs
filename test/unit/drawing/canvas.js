suite('Display', function() {
    var c;

    suite('hy.Display.createCanvas', function() {
        var currentCanvas;
        setup(function() {
            currentCanvas      = hyI.Display.canvas;
            hyI.Display.canvas = hyI.Display.createCanvas(45, 32);
        });


        test('should create instance of hy.Display', function() {
            assert.instanceOf(hyI.Display, hy.Display);
        });
        test('Old DOM object should be deleted', function() {
            assert.notDeepEqual(currentCanvas, hyI.Display.canvas);
        });
        test('Should have set a specific size for canvas', function() {
            assert.equal(hyI.Display.canvas.width, 45);
            assert.equal(hyI.Display.canvas.height, 32);
        });


    });
    suite('hy.Display.resizeCanvas', function() {


        test('Expect an error if an invalid canvas is supplied', function() {
            var resize = function() {
                hyI.Display.resizeCanvas({}, 2, 1);
            }
            expect(resize).to.throw(TypeError);
        });
        test('A valid canvas should not throw an error', function() {
            var resize = function() {
                hyI.Display.resizeCanvas(hyI.Display.canvas, 50, 50);
            }
            expect(resize).to.not.throw(TypeError);
        });
        test('Should resize the canvas', function() {
            var oldW = hyI.Display.canvas.width;
            var oldH = hyI.Display.canvas.height;
            hyI.Display.resizeCanvas(hyI.Display.canvas, 22, 44);
            assert.notEqual(hyI.Display.canvas.height, oldW);
            assert.notEqual(hyI.Display.canvas.height, oldH);
            assert.equal(hyI.Display.canvas.width, 22);
            assert.equal(hyI.Display.canvas.height, 44);
        });
    });
});
