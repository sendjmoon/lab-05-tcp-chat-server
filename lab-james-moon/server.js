const net = require('net');
const clientpool = require('./lib/clientpool');

const server = net.createServer();
const newUser = new clientpool();

server.on('connection', (socket) => {
  newUser.ee.emit('register', socket);
});

server.listen(3000, function() {
  console.log('server is listening');
});
