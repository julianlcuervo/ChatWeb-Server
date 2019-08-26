const path = require('path');
const express = require("express");
const app = express();

//CONFIGURAR PUERTO
app.set('port',process.env.PORT || 4000);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//inicio del servidor
const server = app.listen(app.get('port'), () => {
    console.log('server on port' , app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO.listen(server);



//websockets
io.on('connection', (socket)=>{
    console.log('Nueva Conexion', socket.id)
    //escucha el evento
    socket.on('chat:message',(data)=>{
        //console.log(data)
        //reenvia la informacion a los demas navegadores
        io.sockets.emit('chat:message',data)
    })

    socket.on('chat:typing',(data) =>{
        socket.broadcast.emit('chat:typing',data);
    })
});






