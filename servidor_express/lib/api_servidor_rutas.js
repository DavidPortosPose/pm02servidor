var apiApp = require('./api_servidor_app');
function obtenerParametro(req,nombreParametro){
  var resultado = req.body[nombreParametro];
  if (typeof(resultado) === 'undefined') resultado = req.param(nombreParametro);
  return resultado;
}

function anadirRutaPost(nombreModulo,ruta,funcion){
	var dir = '/' + nombreModulo + '/' + ruta;
	apiApp.app.post(dir,funcion);
}

function anadirRutaGet(nombreModulo,ruta,funcion){
	var dir = '/' + nombreModulo + '/' + ruta;
	apiApp.app.get(dir,funcion);
}



exports.obtenerParametro = obtenerParametro;
exports.anadirRutaPost = anadirRutaPost;
exports.anadirRutaGet = anadirRutaGet;

