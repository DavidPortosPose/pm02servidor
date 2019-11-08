var firebird= require('./lib/api_servidor_firebird');
var rutas= require('./lib/api_servidor_rutas');

var bd = require('./bd');
var activarPermiriOrigen = true;


function permitirOrigen(res){
   if (activarPermiriOrigen) res.header('Access-Control-Allow-Origin', '*');
}

function peticionCb(datos,req,res) {
  permitirOrigen(res); 
  res.send(datos);
}

function peticion(req,res) {
  var operacion = rutas.obtenerParametro(req,'operacion');
  var ip = req.connection.remoteAddress;
  var navegador = req.get('User-Agent'); 
  if (operacion.toLowerCase().indexOf('pub')===0) {
    var params = rutas.obtenerParametro(req,'params');
    var resultado = firebird.construirQuery('*',operacion,params,ip,navegador);
    console.log(resultado);
    bd.query(resultado.query, req, res, peticionCb)
  } else{
      peticionCb({error: true, tipoError:'ERROR_OPERACION_NO_PERMITIDA',rows:[]}, req, res);
  }
}

function iniciar() {
  rutas.anadirRutaPost('dual2', 'peticion2', peticion);
  
}

exports.iniciar = iniciar;
