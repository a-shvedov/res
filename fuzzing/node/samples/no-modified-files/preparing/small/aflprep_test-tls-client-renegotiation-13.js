'use strict';
const {
  assert, connect, keys
} = require(fixtures.path('tls-connect'));
const server = keys.agent10;
connect({
  client: {
    ca: server.ca,
    checkServerIdentity: common.mustCall(),
  },
  server: {
    key: server.key,
    cert: server.cert,
  },
}, function(err, pair, cleanup) {
  assert.ifError(err);
  const client = pair.client.conn;
  assert.strictEqual(client.getProtocol(), 'TLSv1.3');
  const ok = client.renegotiate({}, common.mustCall((err) => {
    assert.throws(() => { throw err; }, {
      message: common.hasOpenSSL3 ?
        'error:0A00010A:SSL routines::wrong ssl version' :
        'error:1420410A:SSL routines:SSL_renegotiate:wrong ssl version',
      code: 'ERR_SSL_WRONG_SSL_VERSION',
      library: 'SSL routines',
      reason: 'wrong ssl version',
    });
    cleanup();
  }));
  assert.strictEqual(ok, false);
});
