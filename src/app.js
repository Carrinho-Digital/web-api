const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const apiRouters = require('./routers');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', apiRouters(express.Router()));

app.get('/hello', (request, response) => {
  return response.json({
    message: 'Hello World',
  });
});


module.exports = app;

