const redis = require('redis');
const app = require('./src/app');
const mongoose = require('mongoose');
const logger = require('./src/lib/logger');
const redisManager = require('./src/lib/redis');

const redisURI = process.env.REDIS_SOCKET_CLIENTS_URL;
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

const redisClient = redis.createClient(redisURI);

mongoose
  .connect(
    mongoURI,
    {
      useFindAndModify: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    },
  );

mongoose.connection.on('connected', (event) => {
  logger.info(`Database connected`, event);

  redisManager.setRedis(redisClient);
  logger.info(`Redis connected`, {redisURL: redisURI});

  app.start();

  app.server.listen(port, () => {
    logger.info(`Application started at :${port}`);
  });
});
