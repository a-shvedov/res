'use strict';
const assert = require('assert');
const net = require('net');
let serverConnection;
let clientConnection;
const echoServer = net.createServer(function(connection) {
  serverConnection = connection;
  setTimeout(common.mustCall(function() {
    assert.strictEqual(serverConnection.readyState, 'open');
    assert.strictEqual(clientConnection.readyState, 'open');
    serverConnection.end();
    clientConnection.end();
    echoServer.close();
  }, 1), common.platformTimeout(100));
  connection.setTimeout(0);
  assert.notStrictEqual(connection.setKeepAlive, undefined);
  connection.setKeepAlive(true, common.platformTimeout(50));
  connection.on('end', function() {
    connection.end();
  });
});
echoServer.listen(0);
echoServer.on('listening', function() {
  clientConnection = net.createConnection(this.address().port);
  clientConnection.setTimeout(0);
});
