const express = require('express');
//const mongoose = require('mongoose');
let db = require('../mongoConnection');
let UsersController = require('../controller/UsersController');
const routes = express.Router();

routes.get('/', UsersController.index);

routes.get('/create', UsersController.storeGet);
routes.post('/create', UsersController.storePut);

routes.get('/', UsersController.index);
routes.get('/:id', UsersController.show);

module.exports = routes;