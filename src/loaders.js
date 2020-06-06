const cors = require('cors');
const io = require('socket.io');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const redis = require('./lib/redis');
const logger = require('./lib/logger');
const apiRouters = require('./routers');
const appSocket = require('./lib/socket');
const { passport } = require('./middleware');
const documentation = require('../documentation');
const { authorize } = require('./domain/users/useCases');

function loadMiddlewares(app) {
  passport();

  app.use(cors());
  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
}

function loadRouters(app) {
  app.use('/api', apiRouters(express.Router()));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation));

  app.get('/hello', (request, response) => {
    return response.json({
      message: 'Hello World',
    });
  });

  app.get('/app-info', (request, response) => {
    return response.json({
      application: 'Carrinho Digital',
      version: 'v1.0.0',
      authors: 'Eclésio Melo, Igor Bueno, Jonathan Lazaro',
    });
  });

  app.post('/notification', (request, response) => {
    const TOPIC = 'dispatch-notification';
    const TOPIC_MESSAGE = 'example message';

    return response.json({
      topic: TOPIC,
      message: TOPIC_MESSAGE,
    });
  });
}

function loadSocket(server) {
  const socketIOServer = io(server);

  function extractClientAuthorization(socket) {
    const headers = socket.handshake.headers;

    logger.info({
      message: '[SOCKET] Authorization Headers',
      headers: headers,
    });

    if (!headers || !headers.cookie) {
      return null;
    }

    const cookies = headers.cookie.split(';');

    const authorizationCookie = cookies.filter(
      cookie => cookie.toString().startsWith('Authorization'));

    logger.info({
      message: '[SOCKET] Authorization Cookies',
      cookies: cookies,
      authorizationCookie,
    });

    if (authorizationCookie.length < 1) {
      return null;
    }

    const [, authorizationToken] = authorizationCookie[0].split('=');

    return authorizationToken;
  }

  socketIOServer.use(async function(socket, next) {
    logger.info({
      message: '[SOCKET] Authorization',
      clientId: socket.client.id,
    });

    const authorizationToken = extractClientAuthorization(socket);
    const isUserAuthorized = await authorize(authorizationToken);

    logger.info({
      message: '[SOCKET] Is User Authorized',
      isUserAuthorized: isUserAuthorized,
      authorizationToken: authorizationToken,
    });

    if (!isUserAuthorized) {
      socket.disconnect();
    } else {
      socket.userId = isUserAuthorized._id.toString();
      next();
    }
  });

  socketIOServer.on('connection', async function(socket) {
    logger.info({
      message: '[SOCKET] Connected',
      clientId: socket.client.id,
      userId: socket.userId,
    });

    await redis.set(socket.userId, socket.client.id);

    socket.on('disconnect', async () => {
      await redis.del(socket.userId);

      logger.info({
        message: '[SOCKET] Disconnected',
        clientId: socket.client.id,
      });
    });
  });

  appSocket.on(appSocket.DISPATCH, (userId, topic, params) => {
    redis.get(userId.toString())
      .then(clientId => socketIOServer.to(clientId).emit(topic, params));
  });
}

module.exports = {
  loadSocket,
  loadRouters,
  loadMiddlewares,
};
