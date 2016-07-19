'use strict';
const net = require('net');

let server = net.createServer(function(socket) {
  console.log('connected');
  socket.write('this is your server speaking\n');
  socket.pipe(process.stdout);

  socket.on('end', function() {

  });
});

server.listen(3000, function() {
  console.log('server is listening');
});
