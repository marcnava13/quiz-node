// GET /login  -- Formulario de login
exports.new = function(req, res){
  var errors = req.session.erros || {};
  req.session.errors = {};

  res.render('sessions/new', {errors: errors});
};

// POST /login  -- Crear la sesión
exports.create = function(req, res){

  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user){

    if(error){ // Si hay error retornamos mensajes de error de sesión
      req.session.errors = [{"message": "Se ha producido un error "+error}];
      res.redirect('/login');
      return;
    }

    // Crear req.session.user y guardar campos id y username
    // La sesión se define por la existencia de: req.session.user
    req.session.user = {id:user.id, username: user.username};

    var d = new Date();
    var autoLogout = (d.getMinutes() * 60) + d.getSeconds() + ( 2 * 60 );
    req.session.autoLogout = autoLogout;

    res.redirect('/quizes');
  });
};

// DELETE /logout  -- Desturir sesión
exports.destroy = function(req, res){
  delete req.session.user;
  delete req.session.autologout;
  res.redirect('/quizes');
};

// MW de autorización de accesos HTTP restringuidos
exports.loginRequired = function(req, res, next){
  if(req.session.user){
    next();
  }else{
    res.redirect('login');
  }
};