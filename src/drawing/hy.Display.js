'use strict';

var hy = require('../core/core');


hy.Display = function(hyInstance, width, height) {

    this._hy = hyInstance;

    this._canvas = this.createCanvas(width, height);
    this._ctx    = this._canvas.getContext('2d');

    this.width  = this._canvas.width;
    this.height = this._canvas.height;

    this._stroke = false;
    this._fill   = false;

    this._styles = {};

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
    this.width          = width;
    this.height         = height;
    canvas.width        = width;
    canvas.height       = height;
    canvas.style.width  = width + 'px';
    canvas.style.height = height + 'px';
};

hy.Display.prototype.background = function(colour) {
    if ( !( colour instanceof hy.Colour ) ) {
        return null;
    }

    this._ctx.save();

    var currentStyle    = this._ctx.fillStyle;
    this._ctx.fillStyle = colour.string();
    this._ctx.fillRect(0, 0, this.width, this.height);
    this._ctx.fillStyle = currentStyle;


    this._ctx.restore();

};

hy.Display.prototype.line = function(x1, y1, x2, y2) {

    this._ctx.beginPath();
    this._ctx.moveTo(x1, y1);
    this._ctx.lineTo(x2, y2);
    this._ctx.stroke();

};

hy.Display.prototype.rect = function(args) {

    var x = args[0], y = args[1], w = args[2], h = args[3];

    this._ctx.beginPath();
    this._ctx.moveTo(x, y);
    this._ctx.lineTo(x, y + h);
    this._ctx.lineTo(x + w, y + h);
    this._ctx.lineTo(x + w, y);
    this._ctx.closePath();

    if ( this._fill ) {
        this._ctx.fill();
    }

    if ( this._stroke ) {
        this._ctx.stroke();
    }

};

hy.Display.prototype.setFill = function(colour) {
    this._styles.fill   = colour.string();
    this._fill          = true;
    this._ctx.fillStyle = this._styles.fill;
};

hy.Display.prototype.unsetFill = function() {
    this._styles.fill   = this._hy._c.STYLE.EMPTY;
    this._fill          = false;
    this._ctx.fillStyle = this._styles.fill;
};

hy.Display.prototype.setStroke = function(colour) {
    this._styles.stroke   = colour.string();
    this._stroke          = true;
    this._ctx.strokeStyle = this._styles.stroke;
};

hy.Display.prototype.unsetStroke = function() {
    console.log('aa');
    this._styles.stroke   = this._hy._c.STYLE.EMPTY;
    this._stroke          = false;
    this._ctx.strokeStyle = this._styles.stroke;
};

module.exports = hy.Display;
