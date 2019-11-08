var firebird = require('node-firebird');
var apiTexto = require('./api_servidor_texto');


function conectar(conexiones_concurrentes,opciones){
    var pool = firebird.pool(conexiones_concurrentes, opciones);
    return pool;
}

function desconectar(pool){
    if ( typeof pool !== 'undefined' ){
        pool.destroy();
    }
}


function obtenerError(str){
    var resultado = 'ERROR_SQL';
    var miArray = str.split(', ');
    var tipo = miArray[0].toLowerCase().indexOf('exception');
    if (tipo!=-1) resultado = miArray[1];
    if (resultado==='numeric overflow') resultado = 'ERROR_NUMERIC_OVERFLOW_STRING_TRUNCATION';

    return resultado;
}

function query(pool,consulta,params,funcionCb,req,res){
    var resultado = {
        error : false,
        tipoError : '',
        rows : [],
        ack: ''
    }
    pool.get(function(err, db) {
        if (err) {            
            resultado.error = true;
            resultado.tipoError = 'ERROR_NO_CONEXION_BD';
            console.log(resultado.tipoError);
            db.detach();
            funcionCb(resultado,req,res);   
        } else {
            db.transaction(firebird.ISOLATION_READ_COMMITED, function(err, transaction) {
                if (err) {            
                    resultado.error = true;
                    resultado.tipoError = 'ERROR_NO_TRANSACCION_BD';
                    console.log(resultado.tipoError);
                    db.detach();
                    funcionCb(resultado,req,res);   
                } else {
                    transaction.query(consulta, params, function(err, result) {            
                        if (err) {
                            resultado.error = true;
                            resultado.tipoError = obtenerError(err.message);
                            transaction.rollback();
                            if (resultado.tipoError=='ERROR_SQL') console.log(consulta);
                            console.log(resultado.tipoError);
                            db.detach();
                            funcionCb(resultado,req,res);   
                        } else {
                            transaction.commit(function(err) {
                                if (err) {
                                    resultado.error = true;
                                    resultado.tipoError = 'ERROR_NO_COMMIT_BD';
                                    transaction.rollback();
                                    console.log(resultado.tipoError);
                                                   
                                } else  resultado.rows = result;
                                db.detach();
                                funcionCb(resultado,req,res);     
                                 
                            }); //Fin de trasaction commit;
                        }
                       
                    });
                }    
            });     
        }
               
    });    
}

function delimitaCampo(campo){
    return firebird.escape(campo);
}

function construirQuery(camposSelect,nombreProcedure, campos,ip,navegador){
    var query;
    var i = 0;
    var ultimoId = '';
    query = 'select ' + camposSelect + ' from ' + nombreProcedure;

    for (item in campos){
        if (i!=0) query +=  ', ';
        else query +=  '(';
        if (campos[item] === 'NULL')
            query += campos[item];
        else {
            if (item.toLowerCase().indexOf('generarid') !=-1){
                campos[item] = apiTexto.obtenerId();
                ultimoId=campos[item];
            }
            if (item.toLowerCase().indexOf('generarmd5') !=-1){
                campos[item] = apiTexto.obtenerMd5(campos[item]);
            } 
            if (item.toLowerCase().indexOf('generarultimoidmd5') !=-1){
                campos[item] = apiTexto.obtenerMd5(ultimoId);
            }
            if (item.toLowerCase().indexOf('obtenerip') !=-1){
                campos[item] = ip;
            }
            if (item.toLowerCase().indexOf('obtenernavegador') !=-1){
                campos[item] = navegador;
            }
            query += firebird.escape(campos[item]);
        }
            
        i++;
    }
    if (i!=0) query += ');';
    var resultado = {};
    resultado.query = query;
    resultado.numCampos = i;
    return resultado;
}




exports.conectar = conectar;
exports.desconectar = desconectar;
exports.query = query;
exports.delimitaCampo = delimitaCampo;
exports.construirQuery = construirQuery;






