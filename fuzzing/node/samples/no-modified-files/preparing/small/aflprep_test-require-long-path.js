'use strict';
if (!common.isWindows)
  common.skip('this test is Windows-specific.');
const fs = require('fs');
const path = require('path');
const dirNameLen = Math.max(260 - tmpdir.path.length, 1);
const dirName = path.join(tmpdir.path, 'x'.repeat(dirNameLen));
const fullDirPath = path.resolve(dirName);
const indexFile = path.join(fullDirPath, 'index.js');
const otherFile = path.join(fullDirPath, 'other.js');
tmpdir.refresh();
fs.mkdirSync(fullDirPath);
fs.writeFileSync(otherFile, '');
require(indexFile);
require(otherFile);
tmpdir.refresh();
