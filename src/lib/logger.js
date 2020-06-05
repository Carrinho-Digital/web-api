const winston = require('winston');

const transports = [new winston.transports.Console()];

const loggerWinston = winston.createLogger({
  transports: transports,
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
