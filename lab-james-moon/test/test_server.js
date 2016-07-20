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
    let totalCalls = 0;
    var messages = ['welcome\n'];
    var messageQueue = [];

    client2.on('data', function(data) {
      totalCalls++;
      expect(data.toString()).to.eql(messages.pop());
      if(messageQueue.length)
        client1.write(messageQueue.pop());
      else
        client1.end();
    });

    client1.on('close', function() {
      client2.end();
      expect(messages.length).to.eql(0);
      done();
    });
  });
});
