const socket = require('../lib/socket');
const logger = require('../lib/logger');

const SOCKET_TOPIC = 'checkout_made';

async function checkoutMadeHandler(eventGuid, data) {
  logger.info({
    handler: 'checkoutMadeHandler',
    data: JSON.stringify(data),
    guid: eventGuid,
  });

  socket.emit(socket.DISPATCH, data.market, SOCKET_TOPIC, data);
}

module.exports = checkoutMadeHandler;
