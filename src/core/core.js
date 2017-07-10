'use strict';

var constants = require('./constants');

var hy = function(debugLevel) {

    if ( debugLevel ) {
        this.debugLevel = debugLevel;
    }

    console.log('HYJS is initialising');

    this.hyLoaded = true;
};


module.exports = hy;
