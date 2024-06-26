'use strict';
const assert = require('assert');
const { promises: fs } = require('fs');
const fn = fixtures.path('empty.txt');
fs.readFile(fn)
  .then(assert.ok);
fs.readFile(fn, 'utf8')
  .then(assert.strictEqual.bind(this, ''));
fs.readFile(fn, { encoding: 'utf8' })
  .then(assert.strictEqual.bind(this, ''));
