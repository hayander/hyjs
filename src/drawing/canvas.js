'use strict';

var hy = require('../core/core');


hy.Canvas = function(hyInstance, width, height) {

    this.hy = hyInstance;

    this.canvas = this.createCanvas(width, height);


    window.requestAnimationFrame(this.drawLoop.bind(this));

};


hy.Canvas.prototype.createCanvas = function(width, height) {

    var c = document.getElementById('hycanvas');

    if ( c ) {
        c.parentNode.removeChild(c);
    }
    c = document.createElement('canvas');

    document.body.appendChild(c);

    c.id = 'hycanvas';

    this.resizeCanvas(c, width, height);


    return c;
};

hy.Canvas.prototype.resizeCanvas = function(canvas, width, height) {
    if ( !( canvas instanceof HTMLElement ) ) {
        throw new TypeError('Invalid canvas to resize');
    }


    canvas.width        = width;
    canvas.height       = height;
    canvas.style.width  = width + 'px';
    canvas.style.height = height + 'px';
};


module.exports = hy.Canvas;
