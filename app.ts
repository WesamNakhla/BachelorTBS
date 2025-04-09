import express from 'express';
import { setupSwagger } from './backend/docs/swagger'; // Import setupSwagger function from swagger.ts

const app = express();

// Your other middlewares and routes
// ...

// Swagger
setupSwagger(app);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
  console.log('Swagger documentation: http://localhost:3000/api-docs');
});
