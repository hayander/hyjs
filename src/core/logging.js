'use strict';

var hy = require('./core');

hy.prototype.log = function(errorLevel, message) {
    if ( errorLevel >= this.debugLevel ) {

        if ( typeof message !== 'string' ) {
            console.log(message);
        } else {
            console.log('[' + errorLevel + '] ' + message + (typeof message !== 'string' ? ':' : ''));
        }
    }
};

module.exports = hy;
