suite('Canvas', function() {
    var c;

    suite('hy.Canvas.createCanvas', function() {
        var currentCanvas;
        setup(function() {
            currentCanvas     = hyI.Canvas.canvas;
            hyI.Canvas.canvas = hyI.Canvas.createCanvas(45, 32);
        });


        test('should create instance of hy.Canvas', function() {
            assert.instanceOf(hyI.Canvas, hy.Canvas);
        });
        test('Canvas should be a dom object', function() {
            assert.instanceOf(hyI.Canvas.canvas, HTMLElement);
        });
        test('Old DOM object should be deleted', function() {
            assert.notDeepEqual(currentCanvas, hyI.Canvas.canvas);
        });
        test('Should have set a specific size for canvas', function() {
            assert.equal(hyI.Canvas.canvas.width, 45);
            assert.equal(hyI.Canvas.canvas.height, 32);
        });


    });
    suite('hy.Canvas.resizeCanvas', function() {


        test('Expect an error if an invalid canvas is supplied', function() {
            var resize = function() {
                hyI.Canvas.resizeCanvas({}, 2, 1);
            }
            expect(resize).to.throw(TypeError);
        });
        test('A valid canvas should not throw an error', function() {
            var resize = function() {
                hyI.Canvas.resizeCanvas(hyI.Canvas.canvas, 50, 50);
            }
            expect(resize).to.not.throw(TypeError);
        });
        test('Should resize the canvas', function() {
            var oldW = hyI.Canvas.canvas.width;
            var oldH = hyI.Canvas.canvas.height;
            hyI.Canvas.resizeCanvas(hyI.Canvas.canvas, 22, 44);
            assert.notEqual(hyI.Canvas.canvas.height, oldW);
            assert.notEqual(hyI.Canvas.canvas.height, oldH);
            assert.equal(hyI.Canvas.canvas.width, 22);
            assert.equal(hyI.Canvas.canvas.height, 44);
        });
    });
});
