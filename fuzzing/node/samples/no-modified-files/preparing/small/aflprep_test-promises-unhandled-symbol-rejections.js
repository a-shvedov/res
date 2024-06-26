'use strict';
const expectedValueWarning = ['Symbol()'];
const expectedPromiseWarning = ['Unhandled promise rejection. ' +
  'This error originated either by throwing ' +
  'inside of an async function without a catch ' +
  'block, or by rejecting a promise which was ' +
  'not handled with .catch(). To terminate the ' +
  'node process on unhandled promise rejection, ' +
  'use the CLI flag `--unhandled-rejections=strict` (see ' +
  '(rejection id: 1)'];
common.expectWarning({
  UnhandledPromiseRejectionWarning: [
    expectedValueWarning,
    expectedPromiseWarning,
  ],
});
Promise.reject(Symbol());
