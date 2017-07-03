'use strict';

var path = require('path');
var browserify = require('browserify');
var derequire = require('derequire');

var bannerTemplate = '/*! hy.js v<%= pkg.version %> <%= grunt.template.today("mmmm dd, yyyy") %> */';
var outFile = 'lib/hy.js';
var bundleAs = 'hy';

module.exports = function (grunt) {

    var srcFilePath = require.resolve('../../src/app.js');

    var libFilePath = path.resolve(outFile);

    grunt.registerTask('browserify', 'Compile the hy.js source with Browserify', function () {
        var done = this.async();

        var banner = grunt.template.process(bannerTemplate);

        var bundle = browserify(srcFilePath, {standalone: bundleAs}).transform('brfs').bundle();

        // Start the generated output with the banner comment,
        var code = banner + '\n';
        // Then read the bundle into memory so we can run it through derequire
        bundle.on('data', function (data) {
            code += data;
        }).on('end', function () {

            // Bundle has been created. Run through derequire
            grunt.file.write(libFilePath, derequire(code));

            // Success
            grunt.log.writeln('>>'.green + ' Bundle ' + outFile.cyan + ' created.');

            done();
        });
    });
};
