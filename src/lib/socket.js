const EventEmitter = require('events').EventEmitter;

const socketEventEmitter = new EventEmitter;

module.exports = {
  on: socketEventEmitter.on,
  DISPATCH: '@socket/dispatch',
  emit: socketEventEmitter.emit,
};
