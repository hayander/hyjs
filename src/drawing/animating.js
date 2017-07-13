'use strict';

var hy = require('../core/core');

hy.Canvas.prototype.drawLoop   = function() {
    if ( this.hy.drawLoop && typeof this.hy.drawLoop === 'function' ) {

        this.hy.setAttribute('name','value');

        this.frameCount++;

        var userspace = this.hy.getUserSpace();
       // console.log(userspace);
        this.hy.drawLoop.apply(userspace);
        window.requestAnimationFrame(this.drawLoop.bind(this));
    } else {
        this.hy.log(this.DEBUG.ERROR, 'No draw loop defined');
    }
};

module.exports = hy;
