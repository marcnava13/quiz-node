var express = require('express');
var router = express.Router();

// Importamos el controllador de las quizes
var quizController = require('../controllers/quiz_controller');
var authoController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/author', authoController.creditos);

module.exports = router;
