//Módulos node
var express = require('express');
var bodyParser  =  require("body-parser");
var app = express();

var funcionAlCerrar;

var claveCifradoSesion= "Gh1aaf2.";
var modoDesarrollo = true;
var puerto = 80;
var titulo = '';


function alCerrar(funcionCierre){
  funcionAlCerrar = funcionCierre;
}


function iniciar(opciones){
  //Obtener opciones por defecto
  if (typeof(opciones.modoDesarrollo) === 'undefined')
    modoDesarrollo = true;
  else
    modoDesarrollo = opciones.modoDesarrollo;

  if (typeof(opciones.puerto) === 'undefined')
    puerto = 80;
  else
    puerto = opciones.puerto;

    if (typeof(opciones.titulo) === 'undefined')
      titulo = '';
    else
      titulo = opciones.titulo;

  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.json({ type: 'text/plain',limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: false,limit: "50mb" }));
  //SesionesobtenerRutas
  //app.use(express.cookieParser(claveCifradoSesion));
  //app.use(express.session());
  //Archivos publicosobtenerRutas
  app.use(express.static('node_modules/api/cliente'));
  app.use(express.static('archivos'));
  //Rutas
    //Iniciar servidor
  var servidor=app.listen(puerto,function(){
         console.log("Servidor iniciado");
  });


  // Parada del servidor ordenada, cuando se pulsa ctrol-c
  var gracefulShutdown = function() {
      console.log("Se ha recibido la señal de cierre. Apagando el servidor....");
      servidor.close(function() {
        if (typeof(funcionAlCerrar) === 'function') funcionAlCerrar();
        console.log("Las conexiones se han cerrado correctamente");
        process.exit()
      });
      setTimeout(function() {
          console.error("No se han podido cerrar las conexiones. Se fuerza el apagado");
          if (typeof(funcionAlCerrar) === 'function') funcionAlCerrar();
          process.exit()
      }, 10*1000);
  }
  process.on ('SIGTERM', gracefulShutdown);
  process.on ('SIGINT', gracefulShutdown);
}





exports.iniciar = iniciar;
exports.alCerrar = alCerrar;
exports.app = app;
