var gulp = require("gulp");
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mainBowerFiles = require('gulp-main-bower-files');
var mocha = require('gulp-mocha');
var Server = require('karma').Server;
var gulpProtractorAngular = require('gulp-angular-protractor');


gulp.task('default', ['lint']);



gulp.task('lint', function() {
    return gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

/*
 Tarea : No exponer toda la carpeta bower_components, sino sólo los archivos necesarios, utilizando el plugin "gulp-main-bower-files"
 */
gulp.task('main-bower-files', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles([[filter],options][callback]))
    .pipe(gulp.dest('./wwwroot/libs')); //TODO ver su la ruta destino es la correcta
});

/*una tarea que permita correrlos a todos (test)
* */
gulp.task('all-test', ['mocha-test', 'karma-test', 'protractor-test']);


/*
* backend,
* */
gulp.task('mocha-test', function () {
    return gulp.src('/test/backend/*.js', {read: false})

        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should'),
                expect: require('expect'),
                mongoose : require("mongoose"),
                mockgoose : require("mockgoose"),
                Idea : require("../../../models/Ideas")
            }
        }));
});


/*frontend (karma) */
gulp.task('karma-test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});



/*end-to-end (protractor)*/
// Setting up the test task
gulp.task('protractor-test', function(callback) {
    gulp
        .src(['/test/e2e/*.js'])
        .pipe(gulpProtractorAngular({
            'configFile': 'protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', callback);
});