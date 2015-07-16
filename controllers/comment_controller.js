var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res){
  res.render('comments/new', { quizId: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res){
  var comment = models.Comment.build(
    { texto: req.body.comment.texto,
      QuizId: req.params.quizId
    });

    comment
    .validate()
    .then(
      function(err){
        if(err){
          res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
        }else{
          comment // save: guarda en BBDD el campo de texto de comment
          .save()
          .then( function(){ res.redirect('/quizes/'+req.params.quizId); });
        }  // res,redirect: Redirección HTTP a lista de preguntas
      }
    );
};