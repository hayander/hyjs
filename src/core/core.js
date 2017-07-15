'use strict';


var hy = function(debugLevel) {

    this.setGlobalConstants();

    this.debugLevel = debugLevel !== undefined ? debugLevel : this.DEBUG.INFO;
    this.framerate  = this.DEFAULT.FRAMERATE;
    this.frameCount = 0;
    this.Canvas     = {};
    this.userSpace  = [];

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
