var path = require('path');

// Postgres DATABASE_URL = postgress:://user:passwd@host:port/DATABASE_URL
// SQLite DATABASE_URL = sqlite://:@/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name   = (url[6]||null);
var user      = (url[2]||null);
var pwd       = (url[3]||null);
var protocol  = (url[1]||null);
var dialect   = (url[1]||null);
var host      = (url[5]||null);
var port      = (url[4]||null);
var storage   = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
              { dialect: protocol,
                protocol: protocol,
                port: port,
                host: host,
                storage: storage,   // solo SQLite (.env)
                omitNUll: true      // solo Postgres
              });

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz

// sequelize.sync() crea e inicializa la tabla de preguntas de la BBDD
sequelize.sync().success(function(){
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function (count){
    if(count === 0){
      // la tabla se inicializa solo si esta está vacía
      Quiz.create({
        pregunta: '¿Capital de Italia?',
        respuesta: 'roma'
      });
      Quiz.create({
        pregunta: '¿Capital de Portugal?',
        respuesta: 'lisboa'
      });
      Quiz.create({
        pregunta: '¿Capital de España?',
        respuesta: 'madrid'
      });
      Quiz.create({
        pregunta: '¿Capital de Alemania?',
        respuesta: 'berlin'
      });
      Quiz.create({
        pregunta: '¿Capital de Francia?',
        respuesta: 'paris'
      });
      Quiz.create({
        pregunta: '¿Capital de Holanda?',
        respuesta: 'ámsterdam'
      });
      Quiz.create({
        pregunta: '¿Capital de Bélgica?',
        respuesta: 'brujas'
      });
      Quiz.create({
        pregunta: '¿Capital de Suiza?',
        respuesta: 'berna'
      })
      .success(function(){ console.log('Base de datos inicializada'); });
    }
  });
});
