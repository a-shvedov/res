'use strict';
if (!common.hasCrypto) common.skip('missing crypto');
const assert = require('assert');
const child_process = require('child_process');
const args = ['--tls-min-v1.3', '--tls-max-v1.2', '-p', 'process.version'];
child_process.execFile(process.argv[0], args, (err) => {
  assert(err);
});
