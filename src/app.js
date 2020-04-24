const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const apiRouters = require('./routers');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const documentation = require('../documentation');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', apiRouters(express.Router()));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation));

app.get('/hello', (request, response) => {
  return response.json({
    message: 'Hello World',
  });
});

module.exports = app;
