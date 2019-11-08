var app = require('./lib/api_servidor_app');
var modelo = require('./modelo');

var opciones = {
  puerto : 8081,
  titulo : 'dual express'
}
app.iniciar(opciones);
modelo.iniciar();




