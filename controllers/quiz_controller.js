var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
  models.Quiz.find({
    where: { id: Number(quizId)},
    include: [{ model: models.Comment }]
  }).then(
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
    var query = models.Quiz.findAll();
    var search = "";
    if(req.query.search !== undefined){
      search = req.query.search;
      var criteria = "%" + search.replace(" ", "%") + "%";
      query = models.Quiz.findAll({where: ["pregunta like ?", criteria]});
    }
    // query.then(function(quizes){
    models.Quiz.findAll().then(
      function(quizes){
        res.render('quizes/index', { search: search, quizes: quizes, errors: [] });
    }).catch(function(error){ next(error); });
};

// GET /quizes/:id
exports.show = function(req, res){
    res.render('quizes/show', {title: 'Quiz', quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
  var resultado = "Incorrecto";
  var cl = "alert-danger";
  if(req.query.respuesta.toLowerCase() === req.quiz.respuesta){
    resultado = "Correcto";
    cl = "alert-success";
  }
  res.render('quizes/answer', {title: 'Quiz', quiz: req.quiz, cl: cl, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function(req, res){
  var quiz = models.Quiz.build( // crea objeto quiz
    {pregunta: "", respuesta: "", tema: ""}
  );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res){
  var quiz = models.Quiz.build( req.body.quiz );

  quiz // guardar en BBDD los campos pregunta y respuesta de quiz
  .validate()
  .then(function(err){
    if(err){
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    }else{
      quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
        res.redirect('/quizes');
      }); // Redirección HTTP (URL relativo) lista de preguntas
    }
  });
};

// GET /quizes/:id/edit
exports.edit = function(req, res){
  var quiz = req.quiz; // autoload  de existencia de quiz

  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz
  .validate()
  .then(
    function(err){
      if(err){
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      }else{
        req.quiz // save: guarda campos pregunta y respuestas en BBDD
        .save( {fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes'); }); // redirección HTTPa lista de preguntas (URL relativo)
      }
    }
  );
};

// DELETE /quizes/:id
exports.destroy = function(req, res){
  req.quiz.destroy().then( function(){
    res.redirect('/quizes');
  }).catch(function(error){});
};
