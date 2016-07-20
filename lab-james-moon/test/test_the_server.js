'use strict';

const net = require('net');
const expect = require('chai').expect;

const server = require('../_server.js');
const port = 5000;

describe('this is a chat server', function() {
  before(function(done) {
    server.listen(port, done);
  });

  after(function(done) {
    server.close(done);
  });

  it('should send messages between clients', function(done) {
    let client1 = net.connect({port});
    let client2 = net.connect({port});
    var messages = ['mocha', 'welcome\n'];
    var messageQueue = ['mocha'];

    client2.on('data', function(data) {
      expect(data.toString()).to.have.string(messages.pop());
      if(messageQueue.length) {
        client1.write(messageQueue.pop());
      }
      else {
        client1.end();
      }
    });

    client1.on('close', function() {
      expect(messages.length).to.eql(0);
      client2.end();
      done();
    });
  });
});
