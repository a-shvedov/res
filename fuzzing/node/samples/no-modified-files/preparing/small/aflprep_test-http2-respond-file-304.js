'use strict';
if (!common.hasCrypto)
  common.skip('missing crypto');
const http2 = require('http2');
const assert = require('assert');
const {
  HTTP2_HEADER_CONTENT_TYPE,
  HTTP2_HEADER_STATUS
} = http2.constants;
const fname = fixtures.path('elipses.txt');
const server = http2.createServer();
server.on('stream', (stream) => {
  stream.respondWithFile(fname, {
  }, {
    statCheck(stat, headers) {
      stream.respond({ [HTTP2_HEADER_STATUS]: 304 });
      return false;
    }
  });
});
server.listen(0, () => {
  const req = client.request();
  req.on('response', common.mustCall((headers) => {
    assert.strictEqual(headers[HTTP2_HEADER_STATUS], 304);
    assert.strictEqual(headers[HTTP2_HEADER_CONTENT_TYPE], undefined);
  }));
  req.on('data', common.mustNotCall());
  req.on('end', common.mustCall(() => {
    client.close();
    server.close();
  }));
  req.end();
});
