'use strict';
if (!common.hasCrypto)
  common.skip('missing crypto');
if (!common.opensslCli)
  common.skip('node compiled without OpenSSL CLI.');
const assert = require('assert');
const { spawn } = require('child_process');
const tls = require('tls');
let success = false;
function loadPEM(n) {
  return fixtures.readKey(`${n}.pem`);
}
const server = tls.Server({
  secureProtocol: 'TLSv1_2_server_method',
  key: loadPEM('agent2-key'),
  cert: loadPEM('agent2-cert')
}, null).listen(0, function() {
  const args = ['s_client', '-quiet', '-tls1_1',
                '-connect', `127.0.0.1:${this.address().port}`];
  const client = spawn(common.opensslCli, args);
  let out = '';
  client.stderr.setEncoding('utf8');
  client.stderr.on('data', function(d) {
    out += d;
      success = true;
      server.close();
    }
  });
});
process.on('exit', function() {
  assert(success);
});
