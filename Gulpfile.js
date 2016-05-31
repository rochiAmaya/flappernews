var gulp = require("gulp");
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var inject = require("gulp-inject");
var concat = require("gulp-concat");
var bowerFiles = require('gulp-main-bower-files');
var mocha = require('gulp-mocha');
var Server = require('karma').Server;
var gulpProtractorAngular = require('gulp-angular-protractor');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var del = require('del');
var series = require('stream-series');



//tarea default que corre travis
gulp.task('default', ['lint', 'build']);


//tarea para chequear el codigo con jslint
gulp.task('lint', function() {
    return gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});



//////////////////////////////////////////BUILD seccion
//Ejemplo gulp.src(['js/**/*.js', '!js/**/*.min.js'])
var sources = {
    dependencies:["public/javascripts/external/dependencies-min.js"
        ],
    js: [
        "public/javascripts/**/*.js",
        '!public/javascripts/external/dependencies.js',
        '!public/javascripts/external/dependencies-min.js'],
    test: {
        dependencies:['tests/frontend/dependencies/test-dependencies.js'],
        frontend: [
            '!tests/frontend/dependencies/test-dependencies-min.js',
            '!public/javascripts/external/dependencies.js',
            '!public/javascripts/external/dependencies-min.js',
            '!tests/frontend/dependencies/test-dependencies.js',
            "public/javascripts/**/*.js",
            'tests/frontend/**/*.js'],
        backend: ["tests/backend/**/*.js"],
        e2e: ["tests/e2e/**/*.js"]
    }
};


//funcio para copiar archivos de bower
function dependencyCopy(outDir, outFile, options) {
    return gulp.src("bower.json")
        .pipe(bowerFiles(options || {}))
        .pipe(concat(outFile))
        .pipe(minify())
        .pipe(gulp.dest(outDir));



}

//dependencies-min.js me genera xxx-min.js, como importo solamente este archivo y no el xxx.js
gulp.task("dependency:test:copy", function() {
    del([
        'tests/frontend/dependencies/*'
    ]);
    return dependencyCopy("tests/frontend/dependencies", "test-dependencies.js");
});

gulp.task("dependency:external:copy",function() {
    del([
        'public/javascripts/external/*'
    ]);
    return dependencyCopy("public/javascripts/external", "dependencies.js");
});


//pone los js en el index header
gulp.task("dependency:link", ["dependency:external:copy"], function() {

    var dependencies = gulp.src(sources.dependencies, {read: false});
    var myjs = gulp.src(sources.js, {read: false});

    //series, hace que pueda importar en cierto orden mis archivos. Sirve para cdo hay lios de dependencias.
    return gulp.src("public/index.ejs")
        .pipe(inject((series(dependencies, myjs)), {
            ignorePath: 'public',
            addRootSlash: false
        }))
        .pipe(gulp.dest("public"))
});

gulp.task("build", ["dependency:link"], function(){


});
///////////////////////////////////TEST /////////////////////////////////////////////////////////

/*una tarea que permita correrlos a todos (test)
* */
gulp.task('all-test', ['test:backend', 'test:frontend', 'protractor-test']);


/*
* backend,
* */

gulp.task("test:backend", function() {
    return gulp.src(sources.test.backend)
        .pipe(mocha());
});


/*gulp.task('mocha-test', function () {
    return gulp.src(sources.test.backend, {read: false})

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
});*/


/*frontend (karma) */


gulp.task("karma:dependency:link", ["dependency:test:copy"], function() {
    var dependencies = gulp.src(sources.test.dependencies)
    var front = gulp.src(sources.test.frontend);

    return gulp.src("karma.conf.js")
        .pipe(inject(series(dependencies, front), {
            starttag: "files: [",
            endtag: "],",
            transform: function(path, file, index, total) {
                return '"' + path + '"' + (index + 1 < total ? "," : "");
            },
            addRootSlash: false
        }))
        .pipe(gulp.dest("."))
});

gulp.task("test:frontend", ["karma:dependency:link"], function(done) {
    new Server({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    }).start(done);
});



/*end-to-end (protractor)*/
/*
gulp.task("test:e2e", ["build"], function() {
    return gulp.src(sources.test.e2e)
        .pipe(protractor({configFile: "protractor.conf.js"}));
});*/
// Setting up the test task
gulp.task('protractor-test', function(callback) {
    gulp
        .src(sources.test.e2e)
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


/*

/!*PRacticando ; Concatenar y iglufiar los js de public y routes*!/

gulp.task('demo', function () {
    gulp.src(['public/!*.js', 'routes/!*.js'])
        .pipe(concat('compilacion.js'))
        .pipe(uglify())
        .pipe(minify())
        .pipe(gulp.dest('build/'))
});*/
