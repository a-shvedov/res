'use strict';
const assert = require('assert');
{
  const params = new URLSearchParams();
  assert.throws(() => {
    params.forEach.call(undefined);
  }, {
    code: 'ERR_INVALID_THIS',
    name: 'TypeError',
    message: 'Value of "this" must be of type URLSearchParams'
  });
}
