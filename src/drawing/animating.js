'use strict';

var hy = require('../core/core');

hy.Canvas.prototype.drawLoop = function() {
    if ( this.hy.drawLoop && typeof this.hy.drawLoop === 'function' ) {

        this.hy._frameCount++;
        var currentTime = new Date();
        this.hy._frameRate  = 1000 / (currentTime - this.hy._lastFrameTime);
        this.hy._lastFrameTime  = currentTime;


        this.hy.drawLoop.apply(this);
        window.requestAnimationFrame(this.drawLoop.bind(this));
    } else {
        this.hy.log('No draw loop defined');
    }
};

module.exports = hy;
