const express = require('express');
const { asyncHandler } = require('../app/Support/asyncHandler');
const { jwtAuth } = require('../middleware/jwtAuth');
const { HealthController } = require('../app/Controllers/HealthController');
const { AuthController } = require('../app/Controllers/AuthController');
const { CategoryController } = require('../app/Controllers/CategoryController');
const { ItemController } = require('../app/Controllers/ItemController');

function registerApiRoutes(app) {
  app.get('/', asyncHandler((req, res) => HealthController.root(req, res)));
  app.get('/health', asyncHandler((req, res) => HealthController.health(req, res)));

  app.post('/auth/register', asyncHandler((req, res) => AuthController.register(req, res)));
  app.post('/auth/login', asyncHandler((req, res) => AuthController.login(req, res)));
  app.get('/auth/me', jwtAuth, asyncHandler((req, res) => AuthController.me(req, res)));

  app.get('/items/stats/summary', asyncHandler((req, res) => ItemController.statsSummary(req, res)));
  app.get('/items', asyncHandler((req, res) => ItemController.index(req, res)));
  app.get('/items/:item_id', asyncHandler((req, res) => ItemController.show(req, res)));
  app.post('/items', jwtAuth, asyncHandler((req, res) => ItemController.store(req, res)));
  app.patch('/items/:item_id', jwtAuth, asyncHandler((req, res) => ItemController.update(req, res)));
  app.delete('/items/:item_id', jwtAuth, asyncHandler((req, res) => ItemController.destroy(req, res)));

  app.get('/categories', asyncHandler((req, res) => CategoryController.index(req, res)));
  app.get('/categories/:category_id', asyncHandler((req, res) => CategoryController.show(req, res)));
  app.post('/categories', jwtAuth, asyncHandler((req, res) => CategoryController.store(req, res)));
  app.patch('/categories/:category_id', jwtAuth, asyncHandler((req, res) => CategoryController.update(req, res)));
  app.delete('/categories/:category_id', jwtAuth, asyncHandler((req, res) => CategoryController.destroy(req, res)));
}

module.exports = { registerApiRoutes };
