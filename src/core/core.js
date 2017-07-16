'use strict';

var constants = require('./constants');

var hy = function(debug) {

    this._c = constants;

    this._debugging = debug !== undefined ? debug : false;
    this._targetFrameRate  = this._c.DEFAULT.FRAMERATE;
    this._frameCount = 0;

    if ( document.readyState === 'complete' ) {
        this.initialise();
    } else {
        this.log('DOM is not ready. Waiting...');
        window.addEventListener('load', this.initialise.bind(this));
    }

};


hy.prototype.initialise = function() {

    this.log('Initialising...');


    this.log('Initialising Canvas');

    this.Canvas = new hy.Canvas(this, this._c.DEFAULT.WIDTH, this._c.DEFAULT.HEIGHT);
    this.log('HYJS is initialised');

    this._initialised = true;

};


module.exports = hy;
