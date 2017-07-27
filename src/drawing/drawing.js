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

hy.prototype.text = function(text, x, y) {
    var args = [text, x, y];
    this._display.text(args);
};

hy.prototype.setStroke = function(val) {
    var colour = this.colour(arguments);
    this._display.setStroke(colour);
};

hy.prototype.unsetStroke = function() {
    this._display.unsetStroke();
};

hy.prototype.setStrokeWidth = function(width) {
    if ( typeof width === 'number' ) {
        // Greater than zero
        var w = ( width <= 0 ) ? 1 : width;
        this._display.setStrokeWidth(w);
    }
};

hy.prototype.setFill = function(val) {
    var colour = this.colour(arguments);
    this._display.setFill(colour);
};

hy.prototype.unsetFill = function() {
    this._display.unsetFill();
};

hy.prototype.setRectMode = function(mode) {
    var val = Object.keys(this.MODE).map(function(key) {
        return this.MODE[key];
    }, this);

    // Set mode or default value if doesn't exist.
    var valid = false;
    for ( var i = 0; i < val.length; i ++ ) {
        if ( val[i] === mode ) {
            valid = true;
            break;
        }
    }
    this._modes.rect = ( valid ? mode : this.MODE.SIZE );

};

hy.prototype.setEllipseMode = function(mode) {
    var val = Object.keys(this.MODE).map(function(key) {
        return this.MODE[key];
    }, this);

    // Set mode or default value if doesn't exist.
    var valid = false;
    for ( var i = 0; i < val.length; i ++ ) {
        if ( val[i] === mode ) {
            valid = true;
            break;
        }
    }
    this._modes.ellipse = ( valid ? mode : this.MODE.CENTER );
};

hy.prototype.setTextBaseline = function(baseline) {
    var val = Object.keys(this.BASE).map(function(key) {
        return this.BASE[key];
    }, this);

    // Set mode or default value if doesn't exist.
    var valid = false;
    for ( var i = 0; i < val.length; i ++ ) {
        if ( val[i] === baseline ) {
            valid = true;
            break;
        }
    }
    this._display.setTextBaseline( valid ? baseline : this.BASE.ALPHABETIC );
};

module.exports = hy;
