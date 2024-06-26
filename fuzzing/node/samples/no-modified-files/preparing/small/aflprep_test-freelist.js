'use strict';
const assert = require('assert');
assert.strictEqual(typeof FreeList, 'function');
const flist1 = new FreeList('flist1', 3, Object);
const result = flist1.alloc();
assert.strictEqual(typeof result, 'object');
assert.strictEqual(flist1.list.length, 0);
assert(flist1.free({ id: 'test1' }));
assert(flist1.free({ id: 'test2' }));
assert(flist1.free({ id: 'test3' }));
assert.strictEqual(flist1.free({ id: 'test4' }), false);
assert.strictEqual(flist1.free({ id: 'test5' }), false);
assert.strictEqual(flist1.alloc().id, 'test3');
assert.strictEqual(flist1.alloc().id, 'test2');
assert.strictEqual(flist1.alloc().id, 'test1');
