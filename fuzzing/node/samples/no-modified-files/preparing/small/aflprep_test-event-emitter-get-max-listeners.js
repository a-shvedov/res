'use strict';
const assert = require('assert');
const EventEmitter = require('events');
const emitter = new EventEmitter();
assert.strictEqual(emitter.getMaxListeners(), EventEmitter.defaultMaxListeners);
emitter.setMaxListeners(0);
assert.strictEqual(emitter.getMaxListeners(), 0);
emitter.setMaxListeners(3);
assert.strictEqual(emitter.getMaxListeners(), 3);
const recv = {};
EventEmitter.prototype.on.call(recv, 'event', () => {});
EventEmitter.prototype.on.call(recv, 'event', () => {});
