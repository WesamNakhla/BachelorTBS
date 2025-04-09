const express = require('express');
const setupSwagger = require('./swagger');

const app = express();

// Dine øvrige middlewares og ruter
// ...

// Swagger
setupSwagger(app);

app.listen(3000, () => {
  console.log('Server kjører på http://localhost:3000');
  console.log('Swagger-dokumentasjon: http://localhost:3000/api-docs');
});
