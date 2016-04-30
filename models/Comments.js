
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  idea: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' }
});
/*
CommentSchema.methods.upvote = function(cb) {
  this.votes += 1;
  this.save(cb);
};

CommentSchema.methods.downvote = function(cb) {
  this.votes -= 1;
  this.save(cb);
}*/

mongoose.model('Comment', CommentSchema);
