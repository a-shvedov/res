'use strict';
const assert = require('assert');
const dns = require('dns');
const resolver = new dns.Resolver();
const promiseResolver = new dns.promises.Resolver();
{
  resolver.setLocalAddress('127.0.0.1');
  resolver.setLocalAddress('::1');
  resolver.setLocalAddress('127.0.0.1', '::1');
  promiseResolver.setLocalAddress('127.0.0.1', '::1');
}
{
  assert.throws(() => {
    resolver.setLocalAddress('127.0.0.1', '127.0.0.1');
  }, Error);
  assert.throws(() => {
    resolver.setLocalAddress('::1', '::1');
  }, Error);
  assert.throws(() => {
    resolver.setLocalAddress('bad');
  }, Error);
  assert.throws(() => {
    resolver.setLocalAddress(123);
  }, { code: 'ERR_INVALID_ARG_TYPE' });
  assert.throws(() => {
    resolver.setLocalAddress('127.0.0.1', 42);
  }, { code: 'ERR_INVALID_ARG_TYPE' });
  assert.throws(() => {
    resolver.setLocalAddress();
  }, Error);
  assert.throws(() => {
    promiseResolver.setLocalAddress();
  }, Error);
}
