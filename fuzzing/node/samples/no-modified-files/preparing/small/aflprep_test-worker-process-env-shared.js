'use strict';
const assert = require('assert');
const { Worker, parentPort, SHARE_ENV, workerData } = require('worker_threads');
if (!workerData) {
  process.env.SET_IN_PARENT = 'set';
  assert.strictEqual(process.env.SET_IN_PARENT, 'set');
  const w = new Worker(__filename, {
    workerData: 'runInWorker',
    env: SHARE_ENV
  }).on('exit', common.mustCall(() => {
    assert.strictEqual(process.env.SET_IN_WORKER, 'set');
  }));
  process.env.SET_IN_PARENT_AFTER_CREATION = 'set';
  w.postMessage({});
} else {
  assert.strictEqual(workerData, 'runInWorker');
  assert.strictEqual(process.env.SET_IN_PARENT, 'set');
  process.env.SET_IN_WORKER = 'set';
  assert.strictEqual(process.env.SET_IN_WORKER, 'set');
  parentPort.once('message', common.mustCall(() => {
    assert.strictEqual(process.env.SET_IN_PARENT_AFTER_CREATION, 'set');
  }));
}
