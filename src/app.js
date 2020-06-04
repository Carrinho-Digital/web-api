const http = require('http');
const express = require('express');

const {
  loadSocket,
  loadRouters,
  loadMiddlewares,
} = require('./loaders');

const expressApp = express();
const server = http.Server(expressApp);

loadMiddlewares(expressApp);
loadRouters(expressApp);
loadSocket(server);

module.exports = server;
