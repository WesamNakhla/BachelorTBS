// backend/docs/swagger.ts

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BachelorTBS API Documentation',
      version: '1.0.0',
      description: 'Interactive documentation for the backend API of BachelorTBS project.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./backend/routes/*.ts'], // Adjust the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Sets up Swagger UI for the given Express app.
 * @param app - The Express application instance
 */
export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📚 Swagger UI available at /api-docs');
}

export { swaggerUi, swaggerSpec };
