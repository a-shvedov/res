'use strict';
const { spawn } = require('child_process');
const assert = require('assert');
let child = spawn(process.execPath, [entry]);
child.stderr.setEncoding('utf8');
let stdout = '';
child.stdout.setEncoding('utf8');
child.stdout.on('data', (data) => {
  stdout += data;
});
child.on('close', common.mustCall((code, signal) => {
  assert.strictEqual(code, 0);
  assert.strictEqual(signal, null);
  assert.strictEqual(stdout, 'ok\n');
}));
child = spawn(process.execPath, [entryInvalid]);
let stderr = '';
child.stderr.setEncoding('utf8');
child.stderr.on('data', (data) => {
  stderr += data;
});
child.on('close', common.mustCall((code, signal) => {
  assert.strictEqual(code, 1);
  assert.strictEqual(signal, null);
  assert.ok(stderr.includes('Warning: To load an ES module'));
  assert.ok(stderr.includes('Unexpected token \'export\''));
}));
