const Event = require('events');

const ClientPool = module.exports = function() {
  this.ee = new Event();
  this.pool = {};

  this.ee.on('register', (socket) => {
    socket.write('welcome\n');
    socket.id = socket.remotePort;
    socket.userName = 'guest-' + socket.id;
    socket.on('data', (data) => {
      // socket.write(socket.userName + ': ' + data.toString());
      socket.emit('broadcast', data);
      if (data.toString() === 'END\r\n') {
        socket.emit('end', socket);
        socket.end();
      }
    });
    socket.on('error', (err) => {
      console.log('error received: ' + err);
    });
    socket.on('end', (socket) => {
      console.log('user ' + socket.userName + ' has disconnected');
      delete this.pool[this.socket];
      debugger;
    });
    socket.on('broadcast', (data) => {
      for(var key in this.pool) {
        this.pool[key].write(socket.userName + ': ' + data.toString());
      }
    });



    this.pool[socket.id] = socket;

  });
};

// on('event tag', (param1, param2, param3) => {
//   do stuff;
// });
//
//
// emit('event tag', param1, param2, param3){};
