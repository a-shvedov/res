'use strict';
const assert = require('assert');
const vm = require('vm');
const o = vm.createContext({ console });
let code = 'let a = function() {};\n';
code += 'function b(){}\n';
code += 'var c = function() {};\n';
code += 'var d = () => {};\n';
code += 'let e = () => {};\n';
code += '(function(){return this})().b;\n';
const res = vm.runInContext(code, o, 'test');
assert.strictEqual(typeof res, 'function');
assert.strictEqual(res.name, 'b');
assert.strictEqual(typeof o.a, 'undefined');
assert.strictEqual(typeof o.b, 'function');
assert.strictEqual(typeof o.c, 'function');
assert.strictEqual(typeof o.d, 'function');
assert.strictEqual(typeof o.e, 'undefined');
assert.strictEqual(res, o.b);
