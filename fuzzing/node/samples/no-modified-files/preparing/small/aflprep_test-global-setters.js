const assert = require('assert');
const _process = require('process');
const { Buffer: _Buffer } = require('buffer');
assert.strictEqual(process, _process);
process = 'asdf';
assert.strictEqual(process, 'asdf');
assert.strictEqual(global.process, 'asdf');
global.process = _process;
assert.strictEqual(process, _process);
assert.strictEqual(
  typeof Object.getOwnPropertyDescriptor(global, 'process').get,
  'function');
assert.strictEqual(Buffer, _Buffer);
Buffer = 'asdf';
assert.strictEqual(Buffer, 'asdf');
assert.strictEqual(global.Buffer, 'asdf');
global.Buffer = _Buffer;
assert.strictEqual(Buffer, _Buffer);
assert.strictEqual(
  typeof Object.getOwnPropertyDescriptor(global, 'Buffer').get,
  'function');
