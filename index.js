var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{
    cors:{
        origin:"*"
    }
});
 let data={
     state:0,
     hOff:0,
     mOff:0
 }

 
io.on('connection', function(socket){
  socket.emit('server-send-state',data.state)
  socket.emit('server-send-hOff',data.hOff)
  socket.emit('server-send-mOff',data.mOff)
  socket.on('client-send-state',dt=>{
        data={...data,state:parseInt(dt.state)}
        socket.emit('server-send-state',data.state)
  })
    socket.on('client-send-hOff',dt=>{
      data={...data,hOff:parseInt(dt.hOff)}
      socket.emit('server-send-hOff',data.hOff)
  })
  socket.on('client-send-mOff',dt=>{
    data={...data,mOff:parseInt(dt.mOff)}
    socket.emit('server-send-mOff',data.mOff)
  })
});
 
http.listen(5000, function(){
  console.log('listening on *:5000');
});