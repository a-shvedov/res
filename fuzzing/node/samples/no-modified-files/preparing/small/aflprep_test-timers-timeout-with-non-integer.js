'use strict';
let count = 50;
const time = 1.00000000000001;
const exec = common.mustCall(() => {
  if (--count === 0) {
    return;
  }
  setTimeout(exec, time);
}, count);
exec();
