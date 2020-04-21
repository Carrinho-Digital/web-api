const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Carrinho Digital Web API',
      description: 'Defines the documentation of webapi',
      version: '1.0.0',
    },
    basePath: '/api/v1',
    host: 'http://localhost:8001',
  },
  apis: ['src/domain/**/controllers/*.js'],
};

module.exports = swaggerJsDoc(options);
