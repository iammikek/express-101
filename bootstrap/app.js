const express = require('express');
const { registerApiRoutes } = require('../routes/api');
const { errorHandler } = require('../middleware/errorHandler');

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  registerApiRoutes(app);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
