var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res){
    models.Quiz.findAll().then(function(quizes){
        res.render('quizes/index', { quizes: quizes });
    });
};

// GET /quizes/:id
exports.show = function(req, res){
  models.Quiz.find(req.params.quizId).success(function(quiz){
    res.render('quizes/show', {title: 'Quiz', quiz: quiz});
  });
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
  models.Quiz.find(req.params.quizId).success(function(quiz){
    if(req.query.respuesta.toLowerCase() === quiz.respuesta){
        res.render('quizes/answer', {title: 'Quiz', quiz: quiz, cl: 'alert-success', respuesta: 'Correcto'});
    }else{
        res.render('quizes/answer', {title: 'Quiz', quiz: quiz, cl: 'alert-danger', respuesta: 'Incorrecto'});
    }
  });
};
