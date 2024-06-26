'use strict';
const assert = require('assert');
const { Readable } = require('stream');
const buf = Buffer.alloc(8192);
const readable = new Readable({
  read: common.mustCall(function() {
    this.push(buf);
  }, 31)
});
let i = 0;
readable.on('readable', common.mustCall(function() {
  if (i++ === 10) {
    process.removeAllListeners('readable');
    return;
  }
  const data = readable.read();
  if (i === 1) {
    assert.strictEqual(data.length, 8192 * 2);
  } else {
    assert.strictEqual(data.length, 8192 * 3);
  }
}, 11));
