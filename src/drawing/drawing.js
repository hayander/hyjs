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

hy.prototype.setTextSize = function(size) {
    if ( typeof size === 'number' ) {
        this._display.setTextSize(size);
    }
};

hy.prototype.setTextStyle = function(style) {
    if ( [this.STYLE.ITALIC, this.STYLE.OBLIQUE].indexOf(style) < 0 ) {
        this._display.setTextStyle(this.STYLE.NORMAL);
    } else {
        this._display.setTextStyle(style);
    }
};

hy.prototype.setTextVariant = function(variant) {
    if ( [this.STYLE.SMALLCAPS].indexOf(variant) < 0 ) {
        this._display.setTextVariant(this.STYLE.NORMAL);
    } else {
        this._display.setTextVariant(variant);
    }
};

hy.prototype.setTextAlign = function(alignment) {
    if ( [this.ALIGN.CENTER, this.ALIGN.RIGHT, this.ALIGN.START, this.ALIGN.END].indexOf(alignment) < 0 ) {
        this._display.setTextAlign(this.ALIGN.LEFT);
    } else {
        this._display.setTextAlign(alignment);
    }
};

hy.prototype.setTextFont = function(font) {
    if ( !font || typeof font !== 'string' || font.length < 0 ) {
        this._display.setTextFont(this.DEFAULT.TEXT);
    } else {
        this._display.setTextFont(font);
    }
};

hy.prototype.setTextWeight = function(weight) {
    if ( typeof weight === 'number' && weight >= 0 ) {
        this._display.setTextWeight(weight);
    } else {
        if ( [this.STYLE.BOLD, this.STYLE.BOLDER].indexOf(weight) < 0 ) {
            this._display.setTextWeight(this.STYLE.NORMAL);
        } else {
            this._display.setTextWeight(weight);
        }
    }
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
    for ( var i = 0; i < val.length; i++ ) {
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
    for ( var i = 0; i < val.length; i++ ) {
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
    for ( var i = 0; i < val.length; i++ ) {
        if ( val[i] === baseline ) {
            valid = true;
            break;
        }
    }
    this._display.setTextBaseline(valid ? baseline : this.BASE.ALPHABETIC);
};

module.exports = hy;
