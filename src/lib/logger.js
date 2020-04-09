const winston = require('winston');

const loggerWinston = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format
    .combine(
      winston.format.timestamp(),
      winston.format.prettyPrint(),
    ),
});

const logger = type => (...args) =>
  loggerWinston[type](...args);

module.exports = {
  error: logger('error'),
  warn: logger('warn'),
  info: logger('info'),
  verbose: logger('verbose'),
  debug: logger('debug'),
  silly: logger('silly'),
};
