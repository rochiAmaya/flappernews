// Karma configuration
// Generated on Tue Apr 26 2016 21:35:57 GMT-0300 (ART)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon-chai'],

        //pluggins:['browsery'],


        // list of files / patterns to load in the browser
        files: [

            "tests/frontend/dependencies/test-dependencies.js",

            "public/javascripts/angular-bootstrap-multiselect.js",

            "public/javascripts/angularApp.js",

            "public/javascripts/auth.js",

            "public/javascripts/b-actividades.js",

            "public/javascripts/ideas.js",

            "public/javascripts/materias.js",

            "public/javascripts/nav.js",

            "public/javascripts/post.js",

            "tests/frontend/test-ideas.js",

            "tests/frontend/test.controller.ideas.js"

            ],


        browsers: ['PhantomJS2', 'PhantomJS2_custom'],

        // you can define custom flags
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS2',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    }
                },
                flags: ['--load-images=true'],
                debug: true
            }
        },

        phantomjsLauncher: {
            exitOnResourceError: true
        },

        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
