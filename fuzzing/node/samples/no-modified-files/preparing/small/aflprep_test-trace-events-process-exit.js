'use strict';
const assert = require('assert');
const cp = require('child_process');
const fs = require('fs');
const path = require('path');
tmpdir.refresh();
const FILE_NAME = path.join(tmpdir.path, 'node_trace.1.log');
const proc = cp.spawn(process.execPath,
                      [ '--trace-events-enabled',
                        '-e', 'process.exit()' ],
                      { cwd: tmpdir.path });
proc.once('exit', common.mustCall(() => {
  assert(fs.existsSync(FILE_NAME));
  fs.readFile(FILE_NAME, common.mustCall((err, data) => {
    const traces = JSON.parse(data.toString()).traceEvents;
    assert(traces.length > 0);
  }));
}));
