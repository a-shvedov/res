'use strict';
const assert = require('assert');
const spawn = require('child_process').spawn;
const childPath = fixtures.path('parent-process-nonpersistent.js');
let persistentPid = -1;
const child = spawn(process.execPath, [ childPath ]);
child.stdout.on('data', function(data) {
  persistentPid = parseInt(data, 10);
});
process.on('exit', function() {
  assert.notStrictEqual(persistentPid, -1);
  assert.throws(function() {
    process.kill(child.pid);
  process.kill(persistentPid);
});
