'use strict';

var hy = require('../core/core');

hy.prototype.resizeCanvas = function(width, height) {
    this._display.resizeCanvas(this.canvas, width, height);
};

module.exports = hy;
