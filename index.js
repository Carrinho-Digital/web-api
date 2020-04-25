const app = require('./src/app');
const mongoose = require('mongoose');
const logger = require('./src/lib/logger');
const { config } = require('dotenv');

config();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

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

  app.listen(port, () => {
    logger.info(`Application started at :${port}`);
  });
});
