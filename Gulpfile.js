var gulp = require("gulp");
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mainBowerFiles = require('gulp-main-bower-files');

gulp.task('lint', function() {
    return gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

/*
 No exponer toda la carpeta bower_components, sino sólo los archivos necesarios, utilizando el plugin "gulp-main-bower-files"
 */
gulp.task('main-bower-files', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles([[filter],options][callback]))
    .pipe(gulp.dest('./wwwroot/libs')); //TODO ver su la ruta destino es la correcta
});