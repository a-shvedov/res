'use strict';
const assert = require('assert');
const { MessageChannel } = require('worker_threads');
const { port1, port2 } = new MessageChannel();
const arrayBuf = new ArrayBuffer(10);
common.expectWarning('Warning',
                     'The target port was posted to itself, and the ' +
                     'communication channel was lost');
port2.onmessage = common.mustNotCall();
port2.postMessage(null, [port1, arrayBuf]);
assert.strictEqual(arrayBuf.byteLength, 0);
setTimeout(common.mustNotCall('The communication channel is still open'),
           common.platformTimeout(1000)).unref();
