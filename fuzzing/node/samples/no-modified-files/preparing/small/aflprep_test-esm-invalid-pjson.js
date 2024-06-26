'use strict';
const { spawn } = require('child_process');
const { strictEqual, ok } = require('assert');
const child = spawn(process.execPath, [entry]);
child.stderr.setEncoding('utf8');
let stderr = '';
child.stderr.on('data', (data) => {
  stderr += data;
});
child.on('close', mustCall((code, signal) => {
  strictEqual(code, 1);
  strictEqual(signal, null);
  ok(
    stderr.includes(
      `[ERR_INVALID_PACKAGE_CONFIG]: Invalid package config ${invalidJson} ` +
      `while importing "invalid-pjson" from ${entry}. ` +
      `Unexpected token } in JSON at position ${12 + checkoutEOL.length * 2}`
    ),
    stderr);
}));
