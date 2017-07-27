'use strict';


var hy = function(instance, debug) {

    this._debugging = debug !== undefined ? debug : false;
    this.log('Starting...');

    this._instance = instance;
    this._global   = false;

    if ( document.readyState === 'complete' ) {
        this._initialise();
    } else {
        this.log('DOM is not ready. Waiting...');
        window.addEventListener('load', this._initialise.bind(this));
    }

};

hy.prototype._initialise = function() {
    this.log('Initialising');

    this._initialiseDefaults();
    this._initialiseCanvas();
    this._initialiseInstance();
    this._initialiseUserDrawing();

    this._hyInitialised = true;

    this.log('HYJS is initialised');

};

hy.prototype._initialiseInstance = function() {

    if ( !this._instance ) {
        this._global   = true;
        this._instance = this;
        this._initialiseGlobalInstance();
    }
};

hy.prototype._initialiseDefaults    = function() {

    var constants = require('./constants');

    Object.keys(constants).map(function(key) {
        this[key] = constants[key];
    }, this);


    this._targetDrawRate = this.DEFAULT.DRAWRATE;
    this._lastDrawTime   = new Date();
    this._drawCycles     = 0;

    this._modes = {
        rect: 0,
        ellipse: 0
    };

    this.setRectMode();
    this.setEllipseMode();
};

hy.prototype._initialiseCanvas = function() {

    this._display = new hy.Display(this, this.DEFAULT.WIDTH, this.DEFAULT.HEIGHT);
    this._canvas = this._display._canvas;
    this._ctx = this._display._ctx;

};

hy.prototype._initialiseUserDrawing = function() {

    if ( this._instance && !this._global ) {
        this._instance.call(this);
    }

    var userMethods = {
        'init': this.drawInit || window.drawInit,
        'frame': this.drawFrame || window.drawFrame
    };
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
