'use strict';
if (common.isWindows)
  common.skip('Does not support binding fd on Windows');
const dgram = require('dgram');
const assert = require('assert');
const { TCP, constants } = internalBinding('tcp_wrap');
const TYPE = 'udp4';
{
  const socket = dgram.createSocket(TYPE);
  socket.bind(common.mustCall(() => {
    const anotherSocket = dgram.createSocket(TYPE);
    const { handle } = socket[kStateSymbol];
    assert.throws(() => {
      anotherSocket.bind({
        fd: handle.fd,
      });
    }, {
      code: 'EEXIST',
      name: 'Error',
    });
    socket.close();
  }));
}
{
  const handle = new TCP(constants.SOCKET);
  handle.listen();
  const fd = handle.fd;
  assert.notStrictEqual(fd, -1);
  const socket = new dgram.createSocket(TYPE);
  assert.throws(() => {
    socket.bind({
      fd,
    });
  }, {
    code: 'ERR_INVALID_FD_TYPE',
    name: 'TypeError',
  });
  handle.close();
}
