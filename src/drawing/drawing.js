'use strict';

var hy = require('../core/core');

hy.prototype.background = function() {
    var colour = this.colour(arguments).hex();

    this.ctx.fillStyle = colour;

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

module.exports = hy;
