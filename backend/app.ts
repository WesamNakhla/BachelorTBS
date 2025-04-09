// backend/app.ts

import express from 'express';
import { swaggerUi, swaggerSpec } from './docs/swagger'; // Import Swagger docs

const app = express();

// Swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Other middleware & routes...
// app.use('/api/users', userRoutes);

export default app;
