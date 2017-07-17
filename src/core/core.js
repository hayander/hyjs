'use strict';

var constants = require('./constants');

var hy = function(debug) {

    this._c = constants;

    this._debugging          = debug !== undefined ? debug : false;
    this._targetFrameRate    = this._c.DEFAULT.FRAMERATE;
    this._lastFrameTime      = new Date();
    this._frameCount         = 0;

    if ( document.readyState === 'complete' ) {
        this.initialise();
    } else {
        this.log('DOM is not ready. Waiting...');
        window.addEventListener('load', this.initialise.bind(this));
    }

};


hy.prototype.initialise = function() {

    this.log('Initialising...');


    this.log('Initialising Display');

    this._display = new hy.Display(this, this._c.DEFAULT.WIDTH, this._c.DEFAULT.HEIGHT);

    this.canvas = this._display._canvas;
    this.ctx    = this._display._ctx;

    this._initialised = true;

    this.log(this);
    this.log('HYJS is initialised');


};


module.exports = hy;
