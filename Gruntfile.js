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
        jshint: {
            build: {
                options: {
                    jshintrc: 'grunt/.jshintrc'
                },
                src: [
                    'Gruntfile.js',
                    'grunt/**/*.js'
                ]
            },
            source: {
                options: {
                    jshintrc: 'src/.jshintrc',
                    reporter: 'checkstyle',
                    reporterOutput: 'build/logs/checkstyle.xml'
                },
                src: ['src/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/unit/**/*.js']
            }
        },
        connect: {
            server: {
                options: {
                    base: './',
                    port: 8888,
                    keepalive: false,
                    middleware: function (connect, options, middlewares) {
                        middlewares.unshift(function (req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', '*');
                            return next();
                        });
                        return middlewares;
                    }
                }
            }
        },
        mocha: {
            test: {
                options: {
                    urls:[ 'http://localhost:8888/test/test.html'],
                    reporter: 'XUnit',

                    run: true,
                    log: true,
                    logErrors: true,
                    timeout: 5000
                },
                dest: 'build/logs/test.xml'
            },
            testmin: {
                options: {
                    urls: ['http://localhost:8888/test/test.min.html'],
                    reporter: 'XUnit',
                    run: true,
                    log: true,
                    logErrors: true,
                    timeout: 5000
                },
                dest: 'build/logs/test.min.xml'
            }
        },
        plato: {
            metrics: {
                options: {
                    jshint: grunt.file.readJSON('src/.jshintrc'),
                    dest: 'plato'

                },
                files: {
                    'build/metrics': 'src/**/*.js'
                },

            }
        }
    });

    // Load local task definitions
    grunt.loadTasks('grunt/tasks');

    // Load tasks from external libraries
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-plato');


    grunt.registerTask('build', ['browserify', 'uglify']);
    grunt.registerTask('test', ['jshint', 'build', 'connect', 'mocha', 'plato']);
    grunt.registerTask('default', ['test']);

};

