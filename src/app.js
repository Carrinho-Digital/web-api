const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const apiRouters = require('./routers');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const { passport } = require('./middleware');
const documentation = require('../documentation');

const app = express();

passport();

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

app.get('/app-info', (request, response) => {
  return response.json({
    application: 'Carrinho Digital',
    version: 'v1.0.0',
    authors: 'Eclésio Melo, Igor Bueno, Jonathan Lazaro',
  });
});

module.exports = app;
