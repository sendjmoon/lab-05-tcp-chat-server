const net = require('net');
const clientpool = require('./lib/clientpool');

const server = module.exports = net.createServer();
const newUser = new clientpool();

server.on('connection', (socket) => {
  newUser.ee.emit('register', socket);
});
