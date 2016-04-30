var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Idea = mongoose.model('Idea');
var Tip = mongoose.model('Tip');
var Materia = mongoose.model('Materia');
var Comentario = mongoose.model('Comment');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



/*hace que los post sean por id*/

router.param('idea', function (req, res, next, id) {

    console.log(" *** Pase por el param" + req + " *** ")

    var query = Idea.findById(id);

    console.log(" *** encontre" + query + " *** ")


    query.exec(function (err, idea) {
        if (err) {
            return next(err);
        }
        if (!idea) {
            return next(new Error('can\'t find idea'));
        }

        req.idea = idea;
        return next();
    });
});


/*listado de ideas*/
router.get('/ideas', function (req, res, next) {
    Idea.find({ 'estado': {'$ne':'Eliminado' }}, function (err, ideas) {
        if (err) {
            return next(err);
        }

        res.json(ideas);
    });
});


/*listado de ideas pendientes*/
router.get('/ideasPendientes', function (req, res, next) {
    Idea.find({ 'estado': 'En Revisión'}, function (err, ideas) {
        if (err) {
            return next(err);
        }

        res.json(ideas);
    });
});


/*inserta una idea*/
router.post('/ideas', auth, function (req, res, next) {
    var idea = new Idea(req.body);
    idea.author = req.payload.username;
    idea.estado = 'Disponible';

    console.log(" *** Se creo la idea " + idea.titulo + " *** ")

    idea.save(function (err, idea) {
        if (err) {
            return next(err);
        }

        res.json(idea);
    });
});

router.put('/ideas/:idea/eliminar', auth, function (req, res, next) {
    req.idea.estadoEliminado(function (err, post) {
        console.log(" *** Se elimino la idea " + req.idea._id + " *** ")
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

router.put('/ideas/:idea/postularme', auth, function (req, res, next) {
    req.idea.estadoRevision( req.payload.username, function (err, idea) {
        console.log(" *** El alumno " + req.payload.username + " se postulo para la idea " + req.idea._id + " *** ")
        if (err) {
            return next(err);
        }

        res.json(idea);
    });
});


router.put('/ideas/:idea/aceptarPostulacion', auth, function (req, res, next) {
    req.idea.estadoAceptada(function (err, post) {
        console.log(" *** Se acepto la postulación para la idea " + req.idea._id + " *** ")
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});


router.put('/ideas/:idea/rechazarPostulacion', auth, function (req, res, next) {
    req.idea.estadoRechazarPostulacion(function (err, post) {
        console.log(" *** Se rechazo la postulación para la idea " + req.idea._id + " *** ")
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});




router.get('/ideas/:idea', function (req, res, next) {
    req.idea.populate('comments', function(err, idea) {
        if (err) { return next(err); }

        res.json(idea);
    });
});


//comenta una idea particular
router.post('/ideas/:idea/comments',  auth, function(req, res, next) {
    var comment = new Comentario(req.body);
    comment.idea = req.idea;
    comment.author = req.payload.username;

    comment.save(function(err, comment){
        if(err){ return next(err); }

        req.idea.comments.push(comment);
        req.idea.save(function(err, idea) {
            if(err){ return next(err); }

            res.json(comment);
        });
    });
});


/*PARA LOGIN*/

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});


router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
