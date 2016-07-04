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

//Release
var minimist = require('minimist');

var options = minimist(process.argv.slice(2));

var conventionalChangelog = require('gulp-conventional-changelog');
var bump = require('gulp-bump');
var git = require('gulp-git');
var conventionalGithubReleaser = require('conventional-github-releaser');
var commitConvention = 'jquery';
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var fs = require('fs');



gulp.task('changelog', function() {
    return gulp.src('CHANGELOG.md', { buffer: false })
        .pipe(conventionalChangelog({ preset: commitConvention }))
        .pipe(gulp.dest('./'))
})
gulp.task('bump-version', function() {
    if (!options.type && !options.version)
        throw new Error('You must provide either a --type major/minor/patch or --version x.x.x option')
    return gulp.src(sources.versioned)
        .pipe(bump(options).on('error', gutil.log))
        .pipe(gulp.dest('./'))
})

gulp.task('commit-changes', function() {
    const version = getPackageJsonVersion()
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Preparing to release ' + version))
})

gulp.task('push-changes', function(cb) {
    getBranchName(function(branch) {
        git.push('origin', branch, cb)
    })
})

gulp.task('create-new-tag', function(cb) {
    const version = getPackageJsonVersion();
    getBranchName(function(branch) {
        git.tag('v' + version, 'Releasing version: ' + version, function(error) {
            if (error) { return cb(error) }
            git.push('origin', branch, {args: '--tags'}, cb)
        })
    })
})

gulp.task('github-release', function(done) {
    checkReleaseRequirements()
    conventionalGithubReleaser({
        type: 'oauth',
        token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN // 6b736812c48ed108adfc370035d3266e31db33b8
    }, {
        preset: commitConvention
    }, done)
})

gulp.task('release', function(callback) {
    checkReleaseRequirements()
    runSequence(
        'bump-version',
        'changelog',
        'commit-changes',
        'push-changes',
        'create-new-tag',
        'github-release',
        function(error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error)
        })
})

function checkReleaseRequirements() {
    if (!options.type && !options.version)
        throw new Error('You must provide either a --type major/minor/patch or --version x.x.x option')
    if (!process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN)
        throw new Error('In order create releases in GitHub you must have the env variable CONVENTIONAL_GITHUB_RELEASER_TOKEN set with a token')
}

// helper functions
function getBranchName(cb) {
    git.revParse({args: '--abbrev-ref HEAD', cwd: __dirname}, function(err, branch) {
        if (err) throw new Error('Error while getting currrent branch name', err)
        cb(branch)
    })
}

function getPackageJsonVersion() { return JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf8')).version }






//////////////////////////////////////////////////////////////////////




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
    },
    versioned: ['./package.json']
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

gulp.task('lite-test', ['test:backend', 'test:frontend']);

/*
* backend,
* */

gulp.task("test:backend", function() {
    return gulp.src(sources.test.backend)
        .pipe(mocha());
});


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

gulp.task("protractor-test", ["build"], function() {
    return gulp.src(sources.test.e2e)
        .pipe(gulpProtractorAngular({configFile: "protractor.conf.js"}));
});