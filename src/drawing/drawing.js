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

hy.prototype.rect = function(x1, y1, x2, y2) {
    var args = this.adjustPointsForMode(this._modes.rect, x1, y1, x2, y2);
    this._display.rect(args);
};

hy.prototype.ellipse = function(x1, y1, x2, y2) {
    var args = this.adjustPointsForMode(this._modes.ellipse, x1, y1, x2, y2);
    this._display.ellipse(args);
};

hy.prototype.setStroke = function(val) {
    var colour = this.colour(arguments);
    this._display.setStroke(colour);
};

hy.prototype.unsetStroke = function(val) {
    this._display.unsetStroke();
};

hy.prototype.setFill = function(val) {
    var colour = this.colour(arguments);
    this._display.setFill(colour);
};

hy.prototype.unsetFill = function() {
    this._display.unsetFill();
};

hy.prototype.setRectMode = function(mode) {
    var val = Object.keys(this._c.MODE).map(function(key) {
        return this._c.MODE[key];
    }, this);

    // Set mode or default value if doesn't exist.
    this._modes.rect = ( val.includes(mode) ? mode : this._c.MODE.SIZE );

};

hy.prototype.setEllipseMode = function(mode) {
    var val = Object.keys(this._c.MODE).map(function(key) {
        return this._c.MODE[key];
    }, this);

    // Set mode or default value if doesn't exist.
    this._modes.ellipse = ( val.includes(mode) ? mode : this._c.MODE.CENTER );
};


module.exports = hy;
