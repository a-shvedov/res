'use strict';
const assert = require('assert');
const ClientRequest = require('http').ClientRequest;
{
  const req = new ClientRequest({ createConnection: () => {} });
  assert.strictEqual(req.method, 'GET');
}
{
  const req = new ClientRequest({ method: '', createConnection: () => {} });
  assert.strictEqual(req.method, 'GET');
}
{
  const req = new ClientRequest({ path: '', createConnection: () => {} });
  assert.strictEqual(req.method, 'GET');
}
