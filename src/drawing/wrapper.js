'use strict';

var hy = require('../core/core');

hy.prototype.background = function() {
    this.Display.background.apply(this.Display, arguments);
};

module.exports = hy;
