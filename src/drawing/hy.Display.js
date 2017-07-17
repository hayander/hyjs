'use strict';

var hy = require('../core/core');


hy.Display = function(hyInstance, width, height) {

    this._hy = hyInstance;

    this._canvas = this.createCanvas(width, height);
    this._ctx = this._canvas.getContext('2d');

    window.requestAnimationFrame(this.drawLoop.bind(this._hy));

};


hy.Display.prototype.createCanvas = function(width, height) {

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

hy.Display.prototype.resizeCanvas = function(canvas, width, height) {
    if ( !( canvas instanceof HTMLElement ) ) {
        throw new TypeError('Invalid canvas to resize');
    }


    canvas.width        = width;
    canvas.height       = height;
    canvas.style.width  = width + 'px';
    canvas.style.height = height + 'px';
};


module.exports = hy.Display;
