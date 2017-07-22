'use strict';


var hy = require('./core/core');
require('./core/constants');
require('./core/global');
require('./core/logging');


// Rendering
require('./drawing/wrapper');
require('./drawing/hy.Display');
require('./drawing/drawing');
require('./drawing/environment');
require('./drawing/animating');


// Utilities
require('./utilities/colour/hy.Colour');
require('./utilities/drawing');

// TODO: Clean up this initiating code.
var _init = function() {
    // If a drawLoop has been defined, create instance globally
    // Otherwise, do nothing (Waiting for the user to create an instance)
    if ( typeof window.drawFrame === 'function' ) {
        // Create a new instance with debugging
        new hy(null, true);
    }
};



if ( document.readyState === 'complete' ) {
    _init();
} else {
    window.addEventListener('load', _init);
}


module.exports = hy;

