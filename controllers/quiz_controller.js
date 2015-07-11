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
    console.log(req.query.search);
    var query = models.Quiz.findAll();
    var search = "";
    if(req.query.search !== undefined){
      search = req.query.search;
      var criteria = "%" + search.replace(" ", "%") + "%";
      query = models.Quiz.findAll({where: ["pregunta like ?", criteria]});
    }
    query.then(function(quizes){
        res.render('quizes/index', { search: search, quizes: quizes });
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

// GET /quizes/new
exports.new = function(req, res){
  var quiz = models.Quiz.build( // crea objeto quiz
    {pregunta: "", respuesta: ""}
  );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res){
  console.log('HOLA');
  var quiz = models.Quiz.build( req.body.quiz );

  // guardar en BBDD los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).success(function(){
    res.redirect('/quizes');
  }); // Redirección HTTP (URL relativo) lista de preguntas
};
