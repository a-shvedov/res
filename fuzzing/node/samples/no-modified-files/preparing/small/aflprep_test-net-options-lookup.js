'use strict';
const assert = require('assert');
const net = require('net');
['foobar', 1, {}, []].forEach((input) => connectThrows(input));
function connectThrows(input) {
  const opts = {
    host: 'localhost',
    port: 0,
    lookup: input
  };
  assert.throws(() => {
    net.connect(opts);
  }, {
    code: 'ERR_INVALID_ARG_TYPE',
    name: 'TypeError'
  });
}
connectDoesNotThrow(() => {});
function connectDoesNotThrow(input) {
  const opts = {
    host: 'localhost',
    port: 0,
    lookup: input
  };
  return net.connect(opts);
}
{
  const s = connectDoesNotThrow((host, options, cb) => {
    cb(null, '127.0.0.1', 100);
  });
  s.on('error', common.expectsError({
    code: 'ERR_INVALID_ADDRESS_FAMILY',
    host: 'localhost',
    port: 0,
    message: 'Invalid address family: 100 localhost:0'
  }));
}
