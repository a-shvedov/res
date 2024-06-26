'use strict';
const assert = require('assert');
const child_process = require('child_process');
const cp = child_process.spawn(process.execPath, [
  '-e',
  'process.kill(process.pid, "SIGINT")',
]);
cp.on('exit', function(code) {
  assert.notStrictEqual(code, 0);
});
