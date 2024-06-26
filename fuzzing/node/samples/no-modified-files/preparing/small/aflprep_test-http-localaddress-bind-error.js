'use strict';
const assert = require('assert');
const http = require('http');
const invalidLocalAddress = '1.2.3.4';
const server = http.createServer(function(req, res) {
  console.log(`Connect from: ${req.connection.remoteAddress}`);
  req.on('end', function() {
    res.end(`You are from: ${req.connection.remoteAddress}`);
  });
  req.resume();
});
server.listen(0, '127.0.0.1', common.mustCall(function() {
  http.request({
    host: 'localhost',
    port: this.address().port,
    method: 'GET',
    localAddress: invalidLocalAddress
  }, function(res) {
    assert.fail('unexpectedly got response from server');
  }).on('error', common.mustCall(function(e) {
    console.log(`client got error: ${e.message}`);
    server.close();
  })).end();
}));
