//Creacion del servidor en express
var express= require('express'); 
//ejecucion de la libreria express
var app = express();
//Creacion del servidor con libreria http
var server = require('http').Server(app);
//libreria socket guardada en io 
var io = require('socket.io')(server);

//Creacion de un array para guardar los mensajes 
var messages = [{
  id: 1,
  text: "Inicia la conversación",
  author: "Admin" 
}];

app.use(express.static('public'))

//Recibe get en ruta raiz y devuelva un req y un res 
app.get('/hello', function(req, res) {
    res.status(200).send("Hola Mundo!");
  });

//Escuchar mensaje del navegador, recibe un socket como parametro
io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    //conexion de web socket donde se emite el evento messages y mandamos el array messages
    socket.emit('messages', messages);
    //recibimos el evento new-message de public 
    socket.on('new-message', function(data){
      //Añadimos al array messages lo que nos mando public por data
      messages.push(data);
      //Emitimos el evento messeges a todos los sockets con el array de messages
      io.sockets.emit('messages',messages);
      
    });
    
});
//servidor en el puerto 8080
server.listen(8080, function(){
    console.log( "Servidor corriendo en http://localhost:8080");
   });