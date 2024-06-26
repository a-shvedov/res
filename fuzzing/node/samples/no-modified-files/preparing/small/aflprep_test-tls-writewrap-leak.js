'use strict';
if (!common.hasCrypto)
  common.skip('missing crypto');
const assert = require('assert');
const net = require('net');
const tls = require('tls');
const server = net.createServer(common.mustCall((c) => {
  c.destroy();
})).listen(0, common.mustCall(() => {
  const c = tls.connect({ port: server.address().port });
  c.on('error', () => {
    c._undestroy();
  });
  c.write('hello', common.mustCall((err) => {
    assert.strictEqual(err.code, 'ECANCELED');
    server.close();
  }));
}));
