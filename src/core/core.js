'use strict';


var hy = function(debugLevel) {

    this.setGlobalConstants();

    this.debugLevel = debugLevel !== undefined ? debugLevel : this.DEBUG.INFO;
    this._targetFrameRate  = this.DEFAULT.FRAMERATE;
    this._frameCount = 0;

    if ( document.readyState === 'complete' ) {
        this.initialise();
    } else {
        this.log(this.DEBUG.VERBOSE, 'DOM is not ready. Waiting...');
        window.addEventListener('load', this.initialise.bind(this));
    }

};


hy.prototype.initialise = function() {

    this.log(this.DEBUG.VERBOSE, 'Initialising...');


    this.log(this.DEBUG.VERBOSE, 'Initialising Canvas');

    this.Canvas = new hy.Canvas(this, this.DEFAULT.WIDTH, this.DEFAULT.HEIGHT);
    this.log(this.DEBUG.INFO, 'HYJS is initialised');

};


module.exports = hy;
