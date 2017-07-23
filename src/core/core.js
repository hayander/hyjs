'use strict';

var constants = require('./constants');


var hy = function(instance, debug) {

    this._debugging = debug !== undefined ? debug : false;
    this.log('Starting...');


    this._c = constants;

    this._instance = instance;
    this._global   = false;

    this._drawRateTarget = this._c.DEFAULT.DRAWRATE;
    this._lastDrawTime   = new Date();
    this._drawCycles     = 0;

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
    this.log('Initialising');

    this._initialiseCanvas();
    this._initialiseInstance();
    this._initialiseUserDrawing();

    this._initialised = true;

    this.log('HYJS is initialised');

};


hy.prototype._initialiseCanvas = function() {


    this._display = new hy.Display(this, this._c.DEFAULT.WIDTH, this._c.DEFAULT.HEIGHT);

    this._canvas = this._display._canvas;
    this._ctx    = this._display._ctx;

};

hy.prototype._initialiseInstance = function() {
    if ( this._instance ) {
        this._instance.call(this);
    }
    else {
        this._global   = true;
        this._instance = this;
        this._initialiseGlobalInstance();
    }
};

hy.prototype._initialiseUserDrawing = function() {

    var userMethods = {
        'init': this.drawInit || window.drawInit,
        'frame': this.drawFrame || window.drawFrame
    }

    this._setKey('_userMethods', userMethods);

    if ( this._userMethods.frame ) {

        if ( this._userMethods.init ) {
            this._userMethods.init.apply(this);
        }

        // Begins the draw loop
        window.requestAnimationFrame(this._draw.bind(this));
    }
    else {
        this.log('No draw loop defined');
    }

};


module.exports = hy;
