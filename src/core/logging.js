'use strict';

var hy = require('./core');

hy.prototype.log = function(message) {
    if ( this._debugging ) {
        console.log(message);
    }
};

module.exports = hy;
