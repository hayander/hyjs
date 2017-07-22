'use strict';

var constants = require('./constants');

// TODO: GLOBAL MODE
var hy = function(instance, debug) {

    this._debugging       = debug !== undefined ? debug : false;
    this.log('Starting...');


    this._c = constants;

    this._instance = instance;
    this._global = false;

    this._targetFrameRate = this._c.DEFAULT.FRAMERATE;
    this._lastFrameTime   = new Date();
    this._frameCount      = 0;

    this._modes = {
        rect: 0,
        ellipse: 0
    };

    this._text = {
        style: 'normal',
        variant: 'normal',
        weight: 'normal',
        size: 12,
        lineSpace: 15,
        font: 'sans-serif'
    };

    this.setRectMode();
    this.setEllipseMode();

    if ( document.readyState === 'complete' ) {
        this._initialise();
    } else {
        this.log('DOM is not ready. Waiting...');
        window.addEventListener('load', this._initialise.bind(this));
    }
};


hy.prototype._initialise = function() {


    this._display = new hy.Display(this, this._c.DEFAULT.WIDTH, this._c.DEFAULT.HEIGHT);

    this.canvas = this._display._canvas;
    this._ctx   = this._display._ctx;

    this._initialised = true;

    this.log('HYJS is initialised');

    if ( this._instance ) {
        this._instance.call(this);
    }
    else {
        this._global = true;
        this._instance = this;
        this._initialiseGlobalInstance();
    }

    window.requestAnimationFrame(this._draw.bind(this));
};


module.exports = hy;
