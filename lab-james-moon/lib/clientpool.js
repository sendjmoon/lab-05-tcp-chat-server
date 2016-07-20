'use strict';
const Event = require('events');

const ClientPool = module.exports = function() {
  this.ee = new Event();
  this.pool = {};

  this.ee.on('register', (socket) => {
    socket.write('welcome\n');
    socket.id = socket.remotePort;
    socket.userName = 'guest-' + socket.id;

    socket.on('data', (data) => {
      socket.emit('broadcast', data);
      if (data.toString() === 'END\r\n') {
        socket.emit('end');
      }
    });

    socket.on('error', (err) => {
      console.log('error received: ' + err);
    });

    socket.on('close', () => {
      console.log(socket.userName + ' has disconnected');
      delete this.pool[socket.id];
      console.log(this.pool);
      socket.end();
    });

    socket.on('broadcast', (data) => {
      for(var key in this.pool) {
        this.pool[key].write(socket.userName + ': ' + data.toString());
      }
    });
    this.pool[socket.id] = socket;
  });
};
