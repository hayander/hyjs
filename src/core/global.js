'use strict';

var hy = require('./core');

hy.prototype._setKey = function(key, value) {
    this[key] = value;
    if ( this._global ) {
        if ( this._debugging || key.substr(0, 1) !== '_' ) {
            window[key] = value;
        }
        return;
    }
    return value;
};

hy.prototype._initialiseGlobalInstance = function() {

    // Attach hy methods to the window
    for ( var h in this ) {
        // _methods are kept private unless debugging
        if ( this._debugging || h.substr(0, 1) !== '_' ) {
            if ( typeof hy.prototype[h] === 'function' ) {
                this._bindPropertyGlobally(h, this[h].bind(this));
            }
            else {
                this._bindPropertyGlobally(h, this[h]);
            }
        }
    }
};

hy.prototype._bindPropertyGlobally = function(key, value) {
    var object = window;
    if ( typeof value === 'function' ) {
        try {

            if ( key in object ) {
                throw new Error('Global "' + key + '" already exists');
            }

            Object.defineProperty(object, key, {
                configurable: true,
                enumerable: true,
                get: function() {
                    return value;
                },
                set: function(newValue) {
                    Object.defineProperty(object, key, {
                        configurable: true,
                        enumerable: true,
                        value: newValue,
                        writable: true
                    });
                    this.log('WARN: hy function \'' + key + '\' modified. May produce unexpected results.');
                }
            });
        } catch ( e ) {
            if ( typeof e === Error ) {
                this.log(e);
            }
            object[key] = value;
        }
    }
    else {
        object[key] = value;
    }
};

module.exports = hy;
