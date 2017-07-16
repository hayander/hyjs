'use strict';

var hy = require('../core/core');

hy.Canvas.prototype.background = function() {
    var colour = this.hy.colour(arguments).hex();

    var ctx   = this.canvas.getContext('2d');

    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

module.exports = hy;
