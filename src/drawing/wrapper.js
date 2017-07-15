'use strict';

var hy = require('../core/core');

hy.prototype.background = function() {
    this.Canvas.background.apply(this.Canvas, arguments);
};

module.exports = hy;
