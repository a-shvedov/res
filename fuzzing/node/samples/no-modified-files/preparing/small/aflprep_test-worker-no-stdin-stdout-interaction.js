'use strict';
const assert = require('assert');
const { Worker, isMainThread } = require('worker_threads');
if (isMainThread) {
  const w = new Worker(__filename);
  w.on('exit', common.mustCall((status) => {
    assert.strictEqual(status, 0);
  }));
  w.stdout.on('data', common.mustCall(10));
} else {
  process.stdin.on('data', () => {});
  for (let i = 0; i < 10; ++i) {
    process.stdout.write(`processing(${i})\n`, common.mustSucceed());
  }
}
