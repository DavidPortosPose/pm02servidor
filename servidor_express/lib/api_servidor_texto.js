var md5 = require ('MD5');
var shortid = require('shortid');
var crypto = require('crypto');
var algoritmoEncriptar = 'aes-256-ctr';


function reemplazarTodo(cadena, buscar,reemplazar) {
  return cadena.replace(new RegExp(buscar, 'g'), reemplazar);
}

function reemplazarIdsNulos(cadena){
	var idNulo = '%id%';
	while (cadena.search(idNulo) >=0){
		cadena = cadena.replace(idNulo,"id='" + obtenerId() + "'");
	}
	return cadena;
}

function entreComillas(dato){
	return "'" + dato + "'";
}
function fechaAString(fecha,formatoAmericano){
           if (typeof(formatoAmericano) === 'undefined') formatoAmericano = false;   
           var dia =  fecha.getDate();
           var mes =  fecha.getMonth()+1;
           var ano =  fecha.getFullYear();
           var resultado;
           if (formatoAmericano){
                resultado = mes + '/' + dia + '/' + ano;
           } else{
            resultado = dia + '/' + mes + '/' + ano;
           }
           return resultado;
}

function obtenerMd5(texto){
	return md5(texto);
}

function obtenerId(){
  return shortid.generate();
}

function obtenerUltimoDirectorio(path){
	return path.replace(/^.*[\\\/]/, '');	
}

function encriptar(texto,clave){
  var cipher = crypto.createCipher(algoritmoEncriptar,clave)
  var crypted = cipher.update(texto,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function desencriptar(texto,clave){
  var decipher = crypto.createDecipher(algoritmoEncriptar,clave)
  var dec = decipher.update(texto,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}




exports.reemplazarTodo = reemplazarTodo;
exports.obtenerUltimoDirectorio = obtenerUltimoDirectorio;
exports.obtenerId = obtenerId;
exports.obtenerMd5 = obtenerMd5;
exports.reemplazarIdsNulos = reemplazarIdsNulos;
exports.entreComillas = entreComillas;
exports.fechaAString = fechaAString;
exports.encriptar = encriptar;
exports.desencriptar = desencriptar;







