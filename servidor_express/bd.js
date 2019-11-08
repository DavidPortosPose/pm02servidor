	var firebird = require('./lib/api_servidor_firebird');
	var app = require('./lib/api_servidor_app');

	var opciones = {};
	opciones.host = "127.0.0.1";
	opciones.puerto = 3050;
	opciones.database = 'datos';
	opciones.user = 'sysdba';
	opciones.password = 'masterkey';
	var conexionesConcurrentes = 5;
	var pool;

function conectar(){
	console.log('Conectando con bd...');
    pool = firebird.conectar(conexionesConcurrentes,opciones);
}

function desconectar() {
	console.log('Desconectando de bd...');
    firebird.desconectar(pool);
}


function query(consulta,req,res,funcionCb){
    firebird.query(pool,consulta,[],funcionCb,req,res);
}



function alIniciar(){
}


//---Funciones propias del módulo de inicio
function alIniciarApp(){
	conectar();
}


function alCerrarApp(){
	desconectar();
}
//-------------------------------------------


alIniciarApp();
app.alCerrar(alCerrarApp);

//-----------------------------------------------
exports.conectar = conectar;
exports.desconectar = desconectar;
exports.query = query;
exports.pool = pool;
