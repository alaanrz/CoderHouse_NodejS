"use strict";

var server = require('./services/server');
var PORT = 8080;
server.listen(PORT, function () {
  console.log("Servidor escuchando en el puerto ".concat(PORT));
});
server.on('error', function (error) {
  return console.log("Error en servidor ".concat(error));
});