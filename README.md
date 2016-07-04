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
----------------------------------------------------------

# **Cambios en la Iteracion 4**

##HEROKU
Se deployo la app en heroku, en un pipeline 'flapper-pipeline ', con dos app: 
'flapper-2016' que apunta al branch master
'flapper-2016-stg' que apunta al branch dev

ademas de otras instancias, que hablaremos luego.

Para ello, se tuvo que crear una cuanta en heroku, crear cada app, aociandola a github y creando un pipeline que contenga ambas apps. Y crear un archivo: app.json, para configurar el pipeline free (tbn se puede hacer desde la web, pero es mas incomodo.)
En el codigo, se tuvo que crear un aarchivo Procfile en el raiz, para indicarle a heroku que es una app web

###HERUKU y TRAVIS

Para que travis deploye correctamente cada branch en su respectiva app de heroku, se tuvo que modificar la configuracion del archivo: .travis.yml, y setearle el api_key de heroku. La cual tbn se va a seter en las variables de entorno de cada app en el servidor.

###HEROKU LOGS

Para poder ver que pasa en heroku mientras lo configuramos, utilizamos una herramienta de logueo, y se corre así:

``` heroku logs --app flappernews2016-stg```

Con la siguiente salida: 

```
2016-07-04T00:36:54.072068+00:00 app[web.1]:    | | _____ _   _ _ __ ___   ___| |_ _ __(_) ___ ___  (_) ___
2016-07-04T00:36:54.072079+00:00 app[web.1]: 
2016-07-04T00:36:54.072077+00:00 app[web.1]:              |___/
2016-07-04T00:36:54.072084+00:00 app[web.1]:                    https://keymetrics.io/
2016-07-04T00:36:54.072083+00:00 app[web.1]: 
2016-07-04T00:36:54.072078+00:00 app[web.1]:                           Features
2016-07-04T00:36:54.072080+00:00 app[web.1]:                    - CPU/Memory monitoring
2016-07-04T00:36:54.072084+00:00 app[web.1]: 
2016-07-04T00:36:54.072082+00:00 app[web.1]:                    - Real Time log display
2016-07-04T00:36:54.072081+00:00 app[web.1]:                    - Custom value monitoring
2016-07-04T00:36:54.072080+00:00 app[web.1]:                    - HTTP monitoring
2016-07-04T00:36:54.072081+00:00 app[web.1]:                    - Event notification
2016-07-04T00:36:54.072083+00:00 app[web.1]:                           Checkout
2016-07-04T00:36:54.072085+00:00 app[web.1]: 
2016-07-04T00:36:54.072085+00:00 app[web.1]:                         -------------
2016-07-04T00:36:54.072086+00:00 app[web.1]: 
2016-07-04T00:36:54.691671+00:00 app[web.1]: [Keymetrics.io] Using (Public key: rqwt3nhhtaaxx3p) (Private key: o31sxcbeo68srn7)
2016-07-04T00:36:55.777748+00:00 heroku[web.1]: State changed from starting to up
2016-07-04T00:36:55.674971+00:00 app[web.1]: [Keymetrics.io] [Agent updated] Agent ACTIVE - Web Access: https://app.keymetrics.io/
2016-07-04T00:36:55.677425+00:00 app[web.1]: [PM2] Log streaming started
2016-07-04T00:38:50.112196+00:00 heroku[slug-compiler]: Slug compilation finished
2016-07-04T00:38:50.112187+00:00 heroku[slug-compiler]: Slug compilation started
2016-07-04T00:38:49.922909+00:00 heroku[api]: Release v18 created by rochiamaya@gmail.com
2016-07-04T00:38:49.922810+00:00 heroku[api]: Deploy 11b867c by rochiamaya@gmail.com
2016-07-04T00:38:50.144729+00:00 heroku[web.1]: Restarting
2016-07-04T00:38:50.145657+00:00 heroku[web.1]: State changed from up to starting
2016-07-04T00:38:52.772804+00:00 heroku[web.1]: Stopping all processes with SIGTERM
2016-07-04T00:38:54.088731+00:00 heroku[web.1]: Process exited with status 143
2016-07-04T00:38:54.041487+00:00 heroku[web.1]: Starting process with command node ./main.js
2016-07-04T00:38:56.909000+00:00 app[web.1]: 
2016-07-04T00:38:56.908995+00:00 app[web.1]:                         -------------
2016-07-04T00:38:56.909001+00:00 app[web.1]:    Looking for a complete monitoring and management tool for PM2?
2016-07-04T00:38:56.908987+00:00 app[web.1]: 
2016-07-04T00:38:56.909002+00:00 app[web.1]:     _                             _        _            _
2016-07-04T00:38:56.909003+00:00 app[web.1]:    | | _____ _   _ _ __ ___   ___| |_ _ __(_) ___ ___  (_) ___
2016-07-04T00:38:56.909003+00:00 app[web.1]:    | |/ / _ \ | | | '_ ` _ \ / _ \ __| '__| |/ __/ __| | |/ _ \
2016-07-04T00:38:56.909004+00:00 app[web.1]:    |   <  __/ |_| | | | | | |  __/ |_| |  | | (__\__ \_| | (_) |
2016-07-04T00:38:56.909005+00:00 app[web.1]:    |_|\_\___|\__, |_| |_| |_|\___|\__|_|  |_|\___|___(_)_|\___/
2016-07-04T00:38:56.909005+00:00 app[web.1]:              |___/
2016-07-04T00:38:56.909006+00:00 app[web.1]: 
2016-07-04T00:38:56.909006+00:00 app[web.1]:                           Features
2016-07-04T00:38:56.909008+00:00 app[web.1]:                    - Real Time Dashboard
2016-07-04T00:38:56.909007+00:00 app[web.1]: 
2016-07-04T00:38:56.909009+00:00 app[web.1]:                    - Event notification
2016-07-04T00:38:56.909008+00:00 app[web.1]:                    - CPU/Memory monitoring
2016-07-04T00:38:56.909009+00:00 app[web.1]:                    - HTTP monitoring
2016-07-04T00:38:56.909011+00:00 app[web.1]: 
2016-07-04T00:38:56.909010+00:00 app[web.1]:                    - Real Time log display
2016-07-04T00:38:56.909010+00:00 app[web.1]:                    - Custom value monitoring
2016-07-04T00:38:56.909011+00:00 app[web.1]:                           Checkout
2016-07-04T00:38:56.909012+00:00 app[web.1]: 
2016-07-04T00:38:56.909013+00:00 app[web.1]: 
2016-07-04T00:38:56.909014+00:00 app[web.1]:                         -------------
2016-07-04T00:38:56.909012+00:00 app[web.1]:                    https://keymetrics.io/
2016-07-04T00:38:56.909014+00:00 app[web.1]: 
2016-07-04T00:38:58.041828+00:00 app[web.1]: [Keymetrics.io] Using (Public key: rqwt3nhhtaaxx3p) (Private key: o31sxcbeo68srn7)
2016-07-04T00:38:59.546408+00:00 app[web.1]: [Keymetrics.io] [Agent updated] Agent ACTIVE - Web Access: https://app.keymetrics.io/
2016-07-04T00:38:59.555366+00:00 app[web.1]: [PM2] Log streaming started
2016-07-04T00:38:59.851364+00:00 heroku[web.1]: State changed from starting to up
2016-07-04T01:03:09.256312+00:00 heroku[slug-compiler]: Slug compilation finished
2016-07-04T01:03:09.256307+00:00 heroku[slug-compiler]: Slug compilation started
2016-07-04T01:03:09.070549+00:00 heroku[api]: Deploy d0db434 by rochiamaya@gmail.com
2016-07-04T01:03:09.070653+00:00 heroku[api]: Release v19 created by rochiamaya@gmail.com
2016-07-04T01:03:09.742387+00:00 heroku[web.1]: Restarting
2016-07-04T01:03:12.535286+00:00 heroku[web.1]: Starting process with command node ./main.js
2016-07-04T01:03:13.538964+00:00 heroku[web.1]: Stopping all processes with SIGTERM
2016-07-04T01:03:15.129716+00:00 app[web.1]:                         -------------
2016-07-04T01:03:15.129725+00:00 app[web.1]:    |   <  __/ |_| | | | | | |  __/ |_| |  | | (__\__ \_| | (_) |
2016-07-04T01:03:15.129701+00:00 app[web.1]: 
2016-07-04T01:03:15.129730+00:00 app[web.1]: 
2016-07-04T01:03:15.129721+00:00 app[web.1]: 
2016-07-04T01:03:15.129731+00:00 app[web.1]:                           Features
2016-07-04T01:03:15.129732+00:00 app[web.1]: 
2016-07-04T01:03:15.129722+00:00 app[web.1]:    Looking for a complete monitoring and management tool for PM2?
2016-07-04T01:03:15.129723+00:00 app[web.1]:     _                             _        _            _
2016-07-04T01:03:15.129732+00:00 app[web.1]:                    - Real Time Dashboard
2016-07-04T01:03:15.129733+00:00 app[web.1]:                    - CPU/Memory monitoring
2016-07-04T01:03:15.129733+00:00 app[web.1]:                    - HTTP monitoring
2016-07-04T01:03:15.129734+00:00 app[web.1]:                    - Event notification
2016-07-04T01:03:15.129734+00:00 app[web.1]:                    - Custom value monitoring
2016-07-04T01:03:15.129724+00:00 app[web.1]:    | |/ / _ \ | | | '_ ` _ \ / _ \ __| '__| |/ __/ __| | |/ _ \
2016-07-04T01:03:15.129724+00:00 app[web.1]:    | | _____ _   _ _ __ ___   ___| |_ _ __(_) ___ ___  (_) ___
2016-07-04T01:03:15.129736+00:00 app[web.1]: 
2016-07-04T01:03:15.129738+00:00 app[web.1]:                         -------------
2016-07-04T01:03:15.129739+00:00 app[web.1]: 
2016-07-04T01:03:15.129736+00:00 app[web.1]:                           Checkout
2016-07-04T01:03:15.129737+00:00 app[web.1]: 
2016-07-04T01:03:15.129737+00:00 app[web.1]:                    https://keymetrics.io/
2016-07-04T01:03:15.129738+00:00 app[web.1]: 
2016-07-04T01:03:15.129726+00:00 app[web.1]:    |_|\_\___|\__, |_| |_| |_|\___|\__|_|  |_|\___|___(_)_|\___/
2016-07-04T01:03:15.129730+00:00 app[web.1]:              |___/
2016-07-04T01:03:15.129735+00:00 app[web.1]:                    - Real Time log display
2016-07-04T01:03:15.606503+00:00 heroku[web.1]: Process exited with status 143
2016-07-04T01:03:15.893676+00:00 app[web.1]: [Keymetrics.io] Using (Public key: rqwt3nhhtaaxx3p) (Private key: o31sxcbeo68srn7)
2016-07-04T01:03:16.995310+00:00 app[web.1]: [PM2] Log streaming started
2016-07-04T01:03:16.991148+00:00 app[web.1]: [Keymetrics.io] [Agent updated] Agent ACTIVE - Web Access: https://app.keymetrics.io/
2016-07-04T01:03:17.179601+00:00 heroku[web.1]: State changed from starting to up
2016-07-04T01:37:22.854917+00:00 heroku[web.1]: Idling
2016-07-04T01:37:22.855884+00:00 heroku[web.1]: State changed from up to down
2016-07-04T01:37:24.667208+00:00 heroku[web.1]: Stopping all processes with SIGTERM
2016-07-04T01:37:25.783458+00:00 heroku[web.1]: Process exited with status 143
```


###HEROKU y MONGO

En cada app configurada en Heroku, se le agrego el pluggin free de Mongo, y se modifico el archivo: 'app.js'
para que segun desde donde se levante la app, le pegue al mongo local o al que le indica la variable de entorno de heruku, 

```
var connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString || 'mongodb://localhost/news');
```

###HEROKU REVIEW APP
Una vez configurado todo lo anterior. Se seteo en heroku 'Enabled review app', esto significa que cuando un feature-branch realice un pull request a master, si el pull request no tiene conflictos, en heroku se creará una app temporaria con el resultado del merge, para poder pobrar la app, una vez que el pull request es aceptado, la app-temporaria desaparece. 

### PM2 y Keymetrics

Para que pm2 funcione correctamente en travis, se agrego el script al archivo package.json
```
"preinstall": "npm i -g pm2"
```

Y se modifico el archivo Procfile, para decirle a Heroku que la app se levanta a atraves de pm2, y asi puede reportar a keymetrics.

Para reportar en Keymetrics, solo hay que crearse una cuenta de usuario, crear un new bucket y configurar el main.js con
las key que se generan

http://docs.keymetrics.io/

###Changelog

###Automatización del Release con Gulp

Objetivo:
* Setear la versión a liberar en los archivos que haga falta (por ejemplo package.json).
* Generar el changelog
* Commitear los cambios (recuerden que modificamos archivos)
* Pushear los cambios
* Generar el Tag
* Crearlo
* Pushearlo
* Generar un Release en GitHub.


#### Task: bump-version
Utiliza  bump- para el manejo de versiones, y miniminst para el pasaje de parametros
 Parametros aceptados:
patch: cambia a 1.2.3
minor: cambia a 1.3.0
major: cambia a 2.0.0
prerelease: cambia a 1.2.1-1
version: la que yo quiera

#### Task commit-changes
utiliza gulp-git y una funcion pauxiliar para pedirle al packege.json la version actual

#### Task push-changes
ustiliza gulp-git
En consola te pide user y pass

#### Task create-new-tag
Crea un tag y lo pushea con el mismo pluggin

### TAsk github-release
Utiliza conventional-github-releaser
Genera un release en GitHub, para ello es necesario generar un token, GithubProject -> settings ->tokens ->new
y se selecciona el scope  
```
repo  Full control of private repositories
 repo:status  Access commit status
 repo_deployment  Access deployment status
 public_repo  Access public repositories
 ```
-> Generar Token
Hay que copiar el contenido, porq luego es dificil acceder de nuevo a buscar al valor del token generado
Y lo guardamos en una variable de entorno :process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN, la cual agregamos a cada una
de las apps de Heroku, y para levantar local, se utilizo "dotenv" pluggin, y se creo un archivo '.env'
con el siguiente contenido : 

```
CONVENTIONAL_GITHUB_RELEASER_TOKEN=XXXXXXXXXXXXXX
```
#### Task release
LLama a las anteriores task nombradas en el orden correcto

###TRAVIS

Finalmente, se modifico el archivo 'travis.yml' para que deploye en Heroku, solo si se trata de Tags,
```deploy:
    on:
     condition: "tags = true"
```
Para conprobarlo, realice un commit and push, y travis mostro en consola lo siguiente:
```
store build cache
0.00s
3.32snothing changed, not updating cache
Skipping a deployment with the heroku provider because this branch is not permitted
Skipping a deployment with the heroku provider because a custom condition was not met
Done. Your build exited with 0.
```

Luego realice un tag, y mustra lo siguiente:

```
Installing deploy dependencies
Preparing deploy
Deploying application
...
Done. Your build exited with 0.
```
