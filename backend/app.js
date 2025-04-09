const express = require('express');
const app = express();
const setupSwagger = require('./swagger');

app.use(express.json());

// Dine API-ruter her
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Swagger må aktiveres etter at ruter er definert
setupSwagger(app);

// Start server
app.listen(3000, () => {
  console.log('Server kjører på http://localhost:3000');
  console.log('Swagger-dokumentasjon: http://localhost:3000/api-docs');
});
