suite('hy.Color', function() {
    var c;

    suite('hy.prototype.colour()', function() {


        test('Should throw an error if unable to resolve colour', function() {

            expect(function() {
                hyI.colour();
            }).to.throw(TypeError);

            expect(function() {
                hyI.colour('#');
            }).to.throw(TypeError);

            expect(function() {
                hyI.colour('abc');
            }).to.throw(TypeError);

            expect(function() {
                hyI.colour('h', 'y', 'j', 's');
            }).to.throw(TypeError);

            expect(function() {
                hyI.colour(['h', 'y', 'j', 's']);
            }).to.throw(TypeError);

        });
    });
    suite('hy.prototype.colour(grayscale)', function() {
        setup(function() {
            c = hyI.colour(23);
        });

        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [23, 23, 23, 255]);
        });
    });
    suite('hy.prototype.colour(grayscale, alpha)', function() {
        setup(function() {
            c = hyI.colour(23, 80);
        });
        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [23, 23, 23, 80]);
        });

    });
    suite('hy.prototype.colour(#rgb)', function() {
        setup(function() {
            c = hyI.colour('#e5b');
        });
        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [238, 85, 187, 255]);
        });
        suite('Use case checks', function() {
            test('Numeric hex values', function() {
                c = hyI.colour('#000');
                assert.deepEqual(c.rgb, [0, 0, 0, 255]);
            });

            test('Alphabetic hex values', function() {
                c = hyI.colour('#FFF');
                assert.deepEqual(c.rgb, [255, 255, 255, 255]);
            });

            test('Alphanumeric hex values', function() {
                c = hyI.colour('#F00');
                assert.deepEqual(c.rgb, [255, 0, 0, 255]);
                c = hyI.colour('#F0E');
                assert.deepEqual(c.rgb, [255, 0, 238, 255]);
            });
        });


    });
    suite('hy.prototype.colour(#rrggbb)', function() {
        setup(function() {
            c = hyI.colour('#e12c3a');
        });

        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [225, 44, 58, 255]);
        });
        suite('Use case checks', function() {
            test('Numeric hex values', function() {
                c = hyI.colour('#000000');
                assert.deepEqual(c.rgb, [0, 0, 0, 255]);
            });

            test('Alphabetic hex values', function() {
                c = hyI.colour('#FFFFFF');
                assert.deepEqual(c.rgb, [255, 255, 255, 255]);
            });

            test('Alphanumeric hex values', function() {
                c = hyI.colour('#FF0000');
                assert.deepEqual(c.rgb, [255, 0, 0, 255]);
                c = hyI.colour('#FF00EE');
                assert.deepEqual(c.rgb, [255, 0, 238, 255]);
            });
        });
    });
    suite('hy.prototype.colour(r, g, b, a)', function() {

        setup(function() {
            c = hyI.colour(54, 61, 196, 240);
        });

        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [54, 61, 196, 240]);
        });

    });
    suite('hy.prototype.colour([r,g,b,a])', function() {
        setup(function() {
            c = hyI.colour([65, 54, 166, 240]);
        });

        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [65, 54, 166, 240]);
        });

    });
    suite('hy.prototype.colour("rgb(r, g, b)")', function() {
        setup(function() {
            c = hyI.colour('rgb(163,51,42)');
        });
        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [163, 51, 42, 255]);
        });
        suite('Use case checks', function() {
            test('Spacing differences', function() {
                c = hyI.colour('rgb(0,0,0)');
                assert.deepEqual(c.rgb, [0, 0, 0, 255]);
                c = hyI.colour('rgb(125 ,2 ,31)');
                assert.deepEqual(c.rgb, [125, 2, 31, 255]);
                c = hyI.colour('rgb( 50, 50, 50)');
                assert.deepEqual(c.rgb, [50, 50, 50, 255]);
                c = hyI.colour('rgb(100  ,  100,100  )');
                assert.deepEqual(c.rgb, [100, 100, 100, 255]);
                c = hyI.colour('rgb(50,20 , 30)');
                assert.deepEqual(c.rgb, [50, 20, 30, 255]);
                c = hyI.colour('rgb( 12 , 20 , 30 )');
                assert.deepEqual(c.rgb, [12, 20, 30, 255]);
            });
        });

        test('Invalid RGB format should throw an error', function() {

            expect(function() {
                hyI.colour('rgb(a, 5, 3)');
            }).to.throw(TypeError);
        });

    });
    suite('hy.prototype.colour("rgb(r%, g%, b%)")', function() {
        setup(function() {
            c = hyI.colour('rgb(50%,80%,30%)');
        });
        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [127, 204, 76, 255]);
        });
        suite('Use case checks', function() {
            test('Spacing differences', function() {
                c = hyI.colour('rgb(0%,0%,0%)');
                assert.deepEqual(c.rgb, [0, 0, 0, 255]);
                c = hyI.colour('rgb(25% ,2% ,31%)');
                assert.deepEqual(c.rgb, [63, 5, 79, 255]);
                c = hyI.colour('rgb( 50%, 50%, 50%)');
                assert.deepEqual(c.rgb, [127, 127, 127, 255]);
                c = hyI.colour('rgb(100%  ,  100%,100%  )');
                assert.deepEqual(c.rgb, [255, 255, 255, 255]);
                c = hyI.colour('rgb(50%,20% , 30%)');
                assert.deepEqual(c.rgb, [127, 51, 76, 255]);
                c = hyI.colour('rgb( 12% , 20% , 30% )');
                assert.deepEqual(c.rgb, [30, 51, 76, 255]);
            });
        });

    });
    suite('hy.prototype.colour("rgba(r, g, b, a)")', function() {
        setup(function() {
            c = hyI.colour('rgba(163,51,42,80)');
        });

        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [163, 51, 42, 80]);
        });

        test('Invalid RGBA format should throw an error', function() {

            expect(function() {
                hyI.colour('rgb(7, 5, 3, b)');
            }).to.throw(TypeError);
        });

        suite('Use case checks', function() {
            test('Spacing differences', function() {
                c = hyI.colour('rgb(0,0,0,0)');
                assert.deepEqual(c.rgb, [0, 0, 0, 0]);
                c = hyI.colour('rgb(125 ,2 ,31,255)');
                assert.deepEqual(c.rgb, [125, 2, 31, 255]);
                c = hyI.colour('rgb( 50, 50, 50,20)');
                assert.deepEqual(c.rgb, [50, 50, 50, 20]);
                c = hyI.colour('rgb(100  ,  100,100 ,50 )');
                assert.deepEqual(c.rgb, [100, 100, 100, 50]);
                c = hyI.colour('rgb(50,20 , 30, 180)');
                assert.deepEqual(c.rgb, [50, 20, 30, 180]);
                c = hyI.colour('rgb( 12 , 20 , 30, 200 )');
                assert.deepEqual(c.rgb, [12, 20, 30, 200]);
            });
        });




    });
    suite('hy.prototype.colour("rgba(r%, g%, b%, a%)")', function() {
        setup(function() {
            c = hyI.colour('rgb(50%,80%,30%, 80%)');
        });
        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [127, 204, 76, 204]);
        });

        test('Invalid RGBA format should throw an error', function() {

            expect(function() {
                hyI.colour('rgb(20%, 50%, 30%, b%)');
            }).to.throw(TypeError);
        });

        suite('Use case checks', function() {
            test('Spacing differences', function() {
                c = hyI.colour('rgb(0%,0%,0%,0%)');
                assert.deepEqual(c.rgb, [0, 0, 0, 0]);
                c = hyI.colour('rgb(25% ,2% ,31%, 20%)');
                assert.deepEqual(c.rgb, [63, 5, 79, 51]);
                c = hyI.colour('rgb( 50%, 50%, 50%,  31% )');
                assert.deepEqual(c.rgb, [127, 127, 127, 79]);
                c = hyI.colour('rgb(100%  ,  100%,100% , 50% )');
                assert.deepEqual(c.rgb, [255, 255, 255, 127]);
                c = hyI.colour('rgb(50%,20% , 30%, 10%)');
                assert.deepEqual(c.rgb, [127, 51, 76, 25]);
                c = hyI.colour('rgb( 12% , 20% , 30% , 90%)');
                assert.deepEqual(c.rgb, [30, 51, 76, 229]);
            });
        });
    });
    suite('hy.prototype.colour("rgba(r.r, g.g, r.r, a.a)") - Decimal percentage notation', function() {
        setup(function() {
            c = hyI.colour('rgb(0.5,0.8,0.3,0.8)');
        });
        test('Should create instance of hy.Color', function() {
            assert.instanceOf(c, hy.Colour);
        });
        test('Should correctly set RGB levels', function() {
            assert.deepEqual(c.rgb, [127, 204, 76, 204]);
        });

        test('Invalid RGBA format should throw an error', function() {
            expect(function() {
                hyI.colour('rgb(0.a, 0.1, 0.31, 0.8)');
            }).to.throw(TypeError);
        });

        suite('Use case checks', function() {
            test('Spacing differences', function() {
                c = hyI.colour('rgb(0,0,0,0)');
                assert.deepEqual(c.rgb, [0, 0, 0, 0]);
                c = hyI.colour('rgb(0.25 ,0.02 ,0.31, 0.20)');
                assert.deepEqual(c.rgb, [63, 5, 79, 51]);
                c = hyI.colour('rgb( 0.50, 0.50, 0.50,  0.31 )');
                assert.deepEqual(c.rgb, [127, 127, 127, 79]);
                c = hyI.colour('rgb(1  ,  1,1 , 0.50 )');
                assert.deepEqual(c.rgb, [255, 255, 255, 127]);
                c = hyI.colour('rgb(0.5,0.2 , 0.30 ,0.1)');
                assert.deepEqual(c.rgb, [127, 51, 76, 25]);
                c = hyI.colour('rgb( 0.12 , 0.2 , 0.3 , .9)');
                assert.deepEqual(c.rgb, [30, 51, 76, 229]);
            });
        });
    });
});
