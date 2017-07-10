'use strict';

var constants = require('./constants');

var hy = function(debugLevel) {

    if ( debugLevel ) {
        this.debugLevel = debugLevel;
    }

    if ( this.debugLevel >= constants.DEBUG.INFO ) {
        console.log('HYJS is initialising');
    }

    this.hyLoaded = true;
};


module.exports = hy;
