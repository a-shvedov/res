'use strict';
const { OutgoingMessage } = require('http');
const warn = 'OutgoingMessage.prototype._headerNames is deprecated';
common.expectWarning('DeprecationWarning', warn, 'DEP0066');
{
  const outgoingMessage = new OutgoingMessage();
  outgoingMessage._headerNames = {
    'x-flow-id': '61bba6c5-28a3-4eab-9241-2ecaa6b6a1fd'
  };
}
