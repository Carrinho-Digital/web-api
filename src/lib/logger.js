const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

const ENV = process.env.NODE_ENV;

const transports = [new winston.transports.Console()];

if (ENV === 'production') {
  const loggingWinston = new LoggingWinston({
    projectId: 'carrinhodigital',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  transports.push(loggingWinston);
}

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
