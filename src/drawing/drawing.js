'use strict';

var hy = require('../core/core');

hy.Canvas.prototype.background = function(args) {
    var color = this.hy.color(args);
    var ctx   = this.canvas.getContext('2d');

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

module.exports = hy;
