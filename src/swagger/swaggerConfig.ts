import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'FOBOH API',
    version: '1.0.0',
    description: 'API to calculate price and get product data',
  },
  servers: [
    {
      url: 'http://localhost:3000/',
    },
  ],
};

const routesPath = path.join(__dirname, '..', 'routes', '**', '*.ts');

const options = {
  definition: swaggerDefinition,
  apis: [routesPath],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
