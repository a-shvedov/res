'use strict';
const assert = require('assert');
const spawn = require('child_process').spawn;
const path = require('path');
tmpdir.refresh();
const requirePath = JSON.stringify(path.join(tmpdir.path, 'non-existent.json'));
const child = spawn(process.execPath, ['-i']);
let out = '';
const input = `try { require(${requirePath}); } catch {} ` +
              `require('fs').writeFileSync(${requirePath}, '1');` +
              `require(${requirePath});`;
child.stderr.on('data', common.mustNotCall());
child.stdout.setEncoding('utf8');
child.stdout.on('data', (c) => {
  out += c;
});
child.stdout.on('end', common.mustCall(() => {
  assert.ok(out.endsWith('> 1\n> '));
}));
child.stdin.end(input);
