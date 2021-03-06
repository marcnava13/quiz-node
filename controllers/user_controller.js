var users = { admin: { id: 1, username: "admin", password: "admin"},
  usuario: { id: 2, usuario: "usuario", password: "usuario" }
};

// Comprueba si el usuario está registrado en users
// Si autenticación falla o hay errores se ejecuta callback(error)
exports.autenticar = function(login, password, callback){
  if(users[login]){
    if(password === users[login].password){
      callback(null, users[login]);
    }else{
      callback(new Error("Password errónea"));
    }
  }else {
    callback(new Error("No existe el usuario"));
  }
};
