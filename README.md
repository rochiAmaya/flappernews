[![Build Status](https://travis-ci.org/rochiAmaya/flappernews.svg?branch=master)](https://travis-ci.org/rochiAmaya/flappernews)


# **Levantar la app**

```
npm install

bower update

mongo &

npm start

```

----------------------------------------------------------

# **Cambios en la Iteracion3**

Models: no hubo cambios

public:

* se movio el index.ejs a la carpeta public, ya que desde gulp, no la viea en /views


##Test:

###Cliente:
me resultaron muy dificiles, y me tomaron muuucho tiempo. Testie ideas factory,  ideasCrl y VerIdeaCtrl,,, esto me llevo a separr en diferentes modulos la app, ya que d otro modo se complicaba mucho. 

tuve que agregar a la configuracion de karma, sinon-chai, para poder crear el mocks de los servics cuando testeaba los controllers

Ademas tuve que agregar phantomJS, ya que antes tenia el karma corriento con chrome, esto hacia que en travis me fallara. y con la liibreria phantom lo solucione.



###e2e: 
mas divertidos, descubri bugs en la app, como por ejemplo: el logout q no funcionaba por un tema de css, o el manejo deroles era erroneo  o mejorar la usabilidad para q me sea mas facil de testar.

```
 node_modules/protractor/bin/webdriver-manager update
```

Me quedo como duda, (ya qu intente, pero no me salio), utilizar una db mock, con usuarios configurados.

##Gulp:

###Librerias; 
* Server de los test: 
```
var mocha = require('gulp-mocha');
var Server = require('karma').Server;
var gulpProtractorAngular = require('gulp-angular-protractor');
```
* chequeo estilo:
```
var jshint = require('gulp-jshint');
```
* reporter del chequeo de estilo
```
var stylish = require('jshint-stylish');
```
* manejo de archivos
```
var inject = require("gulp-inject");
var concat = require("gulp-concat");

var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
```
* Borrar archivos
```
var del = require('del');
```
* Serializar stream
```
var series = require('stream-series');
```
###Resumen de funcionalidad

En gulp, se creo una tarea de concatenar las dependencias, ademas de una tarea agregar los js a un lugar deseado con los tags de inject. 

Como tenia problemas del orden dee la importacion de dependencias ,serialice su importacion.

Agregue a las tareeas copy, que primero borre todo el contenido de la carpta destino, asi me aseguraba que nunca quedase mugre entre pruba y prueba.

Utilice tareas que anidan a un conjunto de tareas de gulp.

##Bower

instale bower en la app
y luego prosegui con migrar las dependencias incluidas por scr 
a travees del archivo bower.json

y luego , trabaje con gulp para q me cree un concat d las librerias q me traia en bower-components,
a una carpeta en public


##Travis

Cree una cuenta asocindo al repo con travis, 
y agregue un archivo yml, para configurar

al corrrer, no identificaba bower, asi q lo tuve a agreegar
bower install con un force, porque algunas depndencias me tiraban mas de una opcion para elegir cual instalar.
Y puse como ultimo paso del archivo de conf, correr la tarea default d gulp
```
gulp.task('default', ['lint', 'build', 'lite-test']);
```
