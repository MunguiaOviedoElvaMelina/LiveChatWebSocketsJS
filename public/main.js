//Conexion del servidor con socket
var socket = io.connect('http://192.168.1.69:8080', {'forceNew': true});

//Se crea el evento de messages para imprimir los datos a todos los sockets
socket.on('messages', function(data){
  console.log(data);
  render(data);
})

//Se crea una funcion para imprimir los menajes, con estructura
function render(data){
  //recorremos data con .map y retornamos el autor y mensaje
  var html = data.map(function(elem, index){
    return(`<p>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </p>`);
  // se unen los elementos del array con un espacio         
  }).join(" ");
  //Se hace la conxion con el html cen la variable messages
  document.getElementById('messages').innerHTML = html;
  
}
//creacion de funcion de añadir mensajes
function addMessage(e) {
  //creacion del objeto para mandar el usuario y el mensaje 
  var payload = {
    author: document.getElementById('username').value, 
    text: document.getElementById('texto').value
  };

  /*var nuevo = document.getElementById('texto');
  nuevo.value= " ";*/
  // Emitimos el evento new-messages con socket, y le mandamos como dato el objeto payload
  socket.emit('new-message', payload);
  return false;
  
}


