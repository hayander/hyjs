module.exports = function (grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Minifies the code after browserify has bundled it.
        uglify: {
            options: {
                compress: {
                    global_defs: {
                        'IS_MINIFIED': true
                    }
                },
                banner: '/*! hy.js v<%= pkg.version %> <%= grunt.template.today("mmmm dd, yyyy") %> */'
            },
            dist: {
                files: {
                    'lib/hy.min.js': 'lib/hy.js',
                }
            }
        },
    });

    // Load local task definitions
    grunt.loadTasks('build/tasks');

    // Load tasks from external libraries
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['browserify', 'uglify']);

};
