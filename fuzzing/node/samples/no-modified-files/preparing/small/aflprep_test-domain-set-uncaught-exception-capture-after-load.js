'use strict';
const assert = require('assert');
(function foobar() {
  require('domain');
})();
assert.throws(
  () => process.setUncaughtExceptionCaptureCallback(common.mustNotCall()),
  (err) => {
    common.expectsError(
      {
        code: 'ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE',
        name: 'Error',
      }
    )(err);
    assert(err.stack.includes('-'.repeat(40)),
           `expected ${err.stack} to contain dashes`);
    const location = `at foobar (${__filename}:`;
    assert(err.stack.includes(location),
           `expected ${err.stack} to contain ${location}`);
    return true;
  }
);
