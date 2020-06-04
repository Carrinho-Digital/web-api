const { v4: uuidV4 } = require('uuid');

const logger = require('../lib/logger');
const checkoutMadeHandler = require('./checkoutMadeHandler');

const events = {
  CHECKOUT_MADE: '@events/checkout_made',
  AUTHORIZE_DONE: '@events/authorize_done',
};

const eventHandlers = {
  [events.CHECKOUT_MADE]: [
    checkoutMadeHandler,
  ],
  [events.AUTHORIZE_DONE]: [],
};

module.exports = {
  getEvents: events,
  fire: async function(event, params) {
    const eventGuid = uuidV4();

    logger.info({
      event,
      guid: eventGuid,
    });

    const eventsHandlersPromisse = eventHandlers[event].map(
      async handler => await handler(eventGuid, params));

    return await Promise.all(eventsHandlersPromisse);
  },
};
