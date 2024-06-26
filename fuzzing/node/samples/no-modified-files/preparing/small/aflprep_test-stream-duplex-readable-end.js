'use strict';
const assert = require('assert');
const stream = require('stream');
let loops = 5;
const src = new stream.Readable({
  read() {
    if (loops--)
      this.push(Buffer.alloc(20000));
  }
});
const dst = new stream.Transform({
  transform(chunk, output, fn) {
    this.push(null);
    fn();
  }
});
src.pipe(dst);
dst.on('data', () => { });
dst.on('end', common.mustCall(() => {
  assert.strictEqual(loops, 3);
  assert.ok(src.isPaused());
}));
