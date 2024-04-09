'use strict';

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;
const { dbConnect } = require('./db/mongo');

// set the view engine to ejs
app.set('view engine', 'ejs');


//Swagger
const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'Boo Test Assignment',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  // Path to the API docs
  apis: ['routes/*.js'], // Path to the API files that contain JSDoc comments
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use('/profile/', require('./routes/profile')());
app.use('/comment/', require('./routes/comment'))

// app.listen(port);`
const startServer = async () => {
  try {
    await dbConnect();
    app.listen(port);
    console.log(`Express started. Listening on ${port}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();

module.exports = {
  app
}
