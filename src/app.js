const http = require('http');
const express = require('express');
const redisManager = require('./lib/redis');

const {
  loadSocket,
  loadRouters,
  loadMiddlewares,
} = require('./loaders');

const expressApp = express();
const server = http.Server(expressApp);

const start = () => {
  loadMiddlewares(expressApp);
  loadRouters(expressApp);
  loadSocket(server, redisManager.redisClient());
};

module.exports.start = start;
module.exports.server = server;
