'use strict';

var constants = require('./constants');

var hy = function () {
    this.hyLoaded = true;
    console.log("C: " + constants.HAYANDER);
};


module.exports = hy;
