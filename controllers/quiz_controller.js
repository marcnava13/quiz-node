var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      }else{
        next(new Error('No existe quizId = ' + quizId));
      }
    }
  ).catch(function(error) { next(error); });
};

// GET /quizes
exports.index = function(req, res){
    models.Quiz.findAll().then(function(quizes){
        res.render('quizes/index', { quizes: quizes });
    }).catch(function(error){ next(error); });
};

// GET /quizes/:id
exports.show = function(req, res){
    res.render('quizes/show', {title: 'Quiz', quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
  var resultado = "Incorrecto";
  var cl = "alert-danger";
  if(req.query.respuesta.toLowerCase() === req.quiz.respuesta){
    resultado = "Correcto";
    cl = "alert-success";
  }
  res.render('quizes/answer', {title: 'Quiz', quiz: req.quiz, cl: cl, respuesta: resultado});
};
