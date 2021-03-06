'use strict';

var hy = require('../core/core');


hy.Display = function(hyInstance, width, height) {

    this._hy = hyInstance;

    this._canvas = this.createCanvas(width, height);
    this._ctx    = this._canvas.getContext('2d');

    this._styles = {};

    this._stroke = true;
    this._fill   = true;

    // Set default styles
    this.setStroke(this._hy.colour(this._hy.DEFAULT.STROKE));
    this.setFill(this._hy.colour(this._hy.DEFAULT.FILL));

    this._text = {
        style: this._hy.STYLE.NORMAL,
        variant: this._hy.STYLE.NORMAL,
        weight: this._hy.STYLE.NORMAL,
        size: this._hy.DEFAULT.TEXT.SIZE,
        lineSpace: this._hy.DEFAULT.TEXT.LINESPACING,
        font: this._hy.DEFAULT.TEXT.FONT
    };

    this.setInternalFont(this._text);


};


hy.Display.prototype.createCanvas = function(width, height) {

    var c = document.getElementById('hycanvas');

    if ( c ) {
        c.parentNode.removeChild(c);
    }
    c = document.createElement('canvas');

    document.body.appendChild(c);

    c.id = 'hycanvas';

    this.resizeCanvas(c, width, height);


    return c;
};

hy.Display.prototype.resizeCanvas = function(canvas, width, height) {
    if ( !( canvas instanceof HTMLElement ) ) {
        throw new TypeError('Invalid canvas to resize');
    }
    this.width          = width;
    this.height         = height;
    canvas.width        = width;
    canvas.height       = height;
    canvas.style.width  = width + 'px';
    canvas.style.height = height + 'px';

    this._hy._setKey('canvasWidth', this.width);
    this._hy._setKey('canvasHeight', this.height);
};

hy.Display.prototype.background = function(colour) {
    if ( !( colour instanceof hy.Colour ) ) {
        return null;
    }

    this._ctx.save();

    var currentStyle    = this._ctx.fillStyle;
    this._ctx.fillStyle = colour.string();
    this._ctx.fillRect(0, 0, this.width, this.height);
    this._ctx.fillStyle = currentStyle;


    this._ctx.restore();

};

hy.Display.prototype.line = function(x1, y1, x2, y2) {

    if ( !this._canDraw(this._hy.DRAW.STROKE) ) {
        return;
    }

    this._ctx.beginPath();
    this._ctx.moveTo(x1, y1);
    this._ctx.lineTo(x2, y2);

    if ( this._stroke ) {
        this._ctx.stroke();
    }

};

hy.Display.prototype.dot = function(x, y, r) {
    if ( !this._canDraw(this._hy.DRAW.STROKE) ) {
        return;
    }

    if ( r === undefined ) {
        r = this._ctx.lineWidth / 2;
    }

    var currentFill = this._styles.fill;
    this._ctx.fillStyle = this._styles.stroke;
    this._ctx.beginPath();
    this._ctx.arc(x, y, r, 0, this._hy.TWO_PI);
    this._ctx.fill();

    this._ctx.fillStyle = currentFill;


};

hy.Display.prototype.rect = function(args) {

    if ( !this._canDraw() ) {
        return;
    }

    var x = args[0], y = args[1], w = args[2], h = args[3];

    this._ctx.beginPath();
    this._ctx.moveTo(x, y);
    this._ctx.lineTo(x, y + h);
    this._ctx.lineTo(x + w, y + h);
    this._ctx.lineTo(x + w, y);
    this._ctx.closePath();

    if ( this._fill ) {
        this._ctx.fill();
    }

    if ( this._stroke ) {
        this._ctx.stroke();
    }

};

hy.Display.prototype.ellipse = function(args) {

    if ( !this._canDraw() ) {
        return;
    }

    // Optimal control point offset
    // (4/3)*tan(pi/(2n))
    // (4/3)*tan(pi/8) = 4*(sqrt(2)-1)/3 = 0.552284749831

    var offset  = 0.552284749831,
        width   = args[2],
        height  = args[3],
        xLeft   = args[0],
        xRight  = xLeft + width,
        xMiddle = xLeft + ( xRight - xLeft ) / 2,
        yTop    = args[1],
        yBottom = yTop + height,
        yMiddle = yTop + ( yBottom - yTop ) / 2;


    var yOffset = (height / 2) * offset,
        xOffset = (width / 2) * offset;


    this._ctx.beginPath();

    this._ctx.moveTo(xRight, yMiddle);
    this._ctx.bezierCurveTo(xRight, yMiddle - yOffset, xMiddle + xOffset, yTop, xMiddle, yTop);
    this._ctx.bezierCurveTo(xMiddle - xOffset, yTop, xLeft, yMiddle - yOffset, xLeft, yMiddle);
    this._ctx.bezierCurveTo(xLeft, yMiddle + yOffset, xMiddle - xOffset, yBottom, xMiddle, yBottom);
    this._ctx.bezierCurveTo(xMiddle + xOffset, yBottom, xRight, yMiddle + yOffset, xRight, yMiddle);

    this._ctx.closePath();

    if ( this._fill ) {
        this._ctx.fill();
    }

    if ( this._stroke ) {
        this._ctx.stroke();
    }
};

hy.Display.prototype.text = function(args) {
    if ( !this._canDraw() ) {
        return;
    }

    var text = args[0],
        x    = args[1],
        y    = args[2];


    if ( this._stroke ) {
        var originalWidth = this._ctx.lineWidth;
        this._ctx.lineWidth *= 2;
        this._ctx.strokeText(text, x, y);
        this._ctx.lineWidth = originalWidth;
    }
    if ( this._fill ) {
        this._ctx.fillText(text, x, y);
    }
};

hy.Display.prototype.setFill = function(colour) {
    this._styles.fill   = colour.string();
    this._fill          = true;
    this._ctx.fillStyle = this._styles.fill;
};

hy.Display.prototype.unsetFill = function() {
    this._styles.fill   = this._hy.STYLE.EMPTY;
    this._fill          = false;
    this._ctx.fillStyle = this._styles.fill;
};

hy.Display.prototype.setStroke = function(colour) {
    this._styles.stroke   = colour.string();
    this._stroke          = true;
    this._ctx.strokeStyle = this._styles.stroke;
};

hy.Display.prototype.unsetStroke = function() {
    this._styles.stroke   = this._hy.STYLE.EMPTY;
    this._stroke          = false;
    this._ctx.strokeStyle = this._styles.stroke;
};

hy.Display.prototype.setStrokeWidth = function(width) {
    this._ctx.lineWidth = width;
};

hy.Display.prototype.setTextBaseline = function(baseline) {
    this._ctx.textBaseline = baseline;
};

hy.Display.prototype.setTextAlign = function(alignment) {
    this._ctx.textAlign = alignment;
};

hy.Display.prototype.setTextSize = function(size) {
    this._text.size = size + 'px';
    this.setInternalFont();
};

hy.Display.prototype.setTextStyle = function(style) {
    this._text.style = style;
    this.setInternalFont();
};

hy.Display.prototype.setTextVariant = function(variant) {
    this._text.variant = variant;
    this.setInternalFont();
};

hy.Display.prototype.setTextWeight = function(weight) {
    this._text.weight = weight;
    this.setInternalFont();
};

hy.Display.prototype.setTextFont = function(font) {
    this._text.font = font;
    this.setInternalFont();
};


hy.Display.prototype.setInternalFont = function(text) {
    if ( !text ) {
        text = this._text;
    }
    this._ctx.font = [text.style,
        text.variant,
        text.weight,
        text.size,
        text.font].join(' ');
};

hy.Display.prototype._canDraw = function(only) {
    if ( !this._stroke && !this._fill ) {
        return false;
    } else if ( this._stroke && !this._fill ) {
        if ( this._ctx.strokeStyle === this._hy.STYLE.EMPTY ) {
            return false;
        }
    } else if ( this._fill && !this._stroke ) {
        if ( this._ctx.fillStyle === this._hy.STYLE.EMPTY ) {
            return false;
        }
    } else if ( this._ctx.strokeStyle === this._hy.STYLE.EMPTY ) {
        if ( only === this._hy.DRAW.STROKE || this._ctx.fillStyle === this._hy.STYLE.EMPTY ) {
            return false;
        }
    } else if ( this._ctx.fillStyle === this._hy.STYLE.EMPTY ) {
        if ( only === this._hy.DRAW.FILL || this._ctx.strokeStyle === this._hy.STYLE.EMPTY ) {
            return false;
        }
    }


    return true;
};

module.exports = hy.Display;
