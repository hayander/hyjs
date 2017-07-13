'use strict';

var hy = require('./core');

hy.prototype.setAttribute = function(name, value) {
    this[name] = value;
};

hy.prototype.getAttribute = function(name) {
    return this[name];
};

hy.prototype.incAttribute = function(name, value) {
    this[name] +=(value) ? value : 1;
return this[name];
};

hy.prototype.decAttribute = function(name, value) {
    this[name] -=(value) ? value : 1;
    return this[name];
};

hy.prototype.getUserSpace = function(name, value) {
    return this;
};

module.exports = hy;
