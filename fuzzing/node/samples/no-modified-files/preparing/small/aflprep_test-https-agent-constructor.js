'use strict';
if (!common.hasCrypto)
  common.skip('missing crypto');
const assert = require('assert');
const https = require('https');
assert.ok(https.Agent() instanceof https.Agent);
