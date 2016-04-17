var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Idea = mongoose.model('Idea');
var Tip = mongoose.model('Tip');
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

    console.log("pase por el param" + req)

    var query = Idea.findById(id);

    console.log("e ncontre" + query)


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
    Idea.find(function (err, ideas) {
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

    idea.save(function (err, idea) {
        if (err) {
            return next(err);
        }

        res.json(idea);
    });
});

/*router.put('/ideas/:idea/eliminar', auth, function(req, res, next) {
  req.idea.eliminar(function(err, idea){
    if (err) { return next(err); }

    res.json(idea);
  });
 });*/


router.put('/ideas/:idea/eliminar', auth, function (req, res, next) {
    req.post.estadoEliminado(function (err, post) {
        console.log("Pase por eliminar")
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});


router.get('/ideas/:idea', function (req, res, next) {
    res.json(req.idea);
});

/*



 /!*dvuelve el post del parametro y l listado de comentarios*!/
router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});
/!*dvuelve el comment del parametro*!/
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }

    req.comment = comment;
    return next();
  });
});

/!*inserta un post*!/
router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

/!*aumenta el nro de estrellas*!/
//llama al método de upvote de post.js
router.put('/posts/:post/upvote',  auth,function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.put('/posts/:post/downvote',  auth,function(req, res, next) {
  req.post.downvote(function(err, post){
    if (err) { return next(err); }
    res.json(post);
  });
});



/!*comenta un post particular*!/
router.post('/posts/:post/comments',  auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

router.put('/posts/:post/comments/:comment/downvote',  auth,function(req, res, next) {
  req.comment.downvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

*/


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
