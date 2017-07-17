'use strict';

var hy = require('../core/core');

hy.prototype.background = function() {
    var colour = this.colour(arguments);

    this._display.background(colour);

    return this;
};

hy.prototype.line = function(x1, y1, x2, y2) {
    this._display.line(x1, y1, x2, y2);
};

hy.prototype.setStroke = function(val) {
    var colour = this.colour(arguments);
    this._display.setStroke(colour);
};

hy.prototype.setFill = function(val) {
    var colour = this.colour(arguments);
    this._display.setFill(colour);
};

hy.prototype.noFill = function() {

};


module.exports = hy;
