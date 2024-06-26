'use strict';
const assert = require('assert');
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
client.bind(0, common.mustCall(function() {
  client.on('message', common.mustCall(callback));
  const port = this.address().port;
  const buf = Buffer.alloc(1);
  const interval = setInterval(function() {
    client.send(buf, 0, 0, port, '127.0.0.1', common.mustCall(callback));
  }, 10);
  function callback(firstArg) {
    if (firstArg instanceof Buffer) {
      assert.strictEqual(firstArg.length, 0);
      clearInterval(interval);
      client.close();
    }
  }
}));
