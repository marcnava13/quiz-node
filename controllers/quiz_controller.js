var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res){
  models.Quiz.findAll().success(function(quiz){
    res.render('quizes/question', { title: 'Quiz', pregunta: quiz[0].pregunta });
  });
};

// GET /quizes/answer
exports.answer = function(req, res){
  models.Quiz.findAll().success(function(quiz){
    if(req.query.respuesta.toLowerCase() === quiz[0].respuesta){
        res.render('quizes/answer', {title: 'Quiz', cl: 'alert-success', respuesta: 'Correcto'});
    }else{
        res.render('quizes/answer', {title: 'Quiz', cl: 'alert-danger', respuesta: 'Incorrecto'});
    }
  });
};