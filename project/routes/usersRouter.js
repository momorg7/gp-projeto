const express = require('express');
//const mongoose = require('mongoose');
let db = require('../mongoConnection');
let UsersController = require('../controller/UsersController');
const routes = express.Router();

// LOGIN
routes.get('/login', UsersController.loginGet);
// CREATE
routes.post('/create', UsersController.storePut);
routes.get('/create', UsersController.storeGet);
// READ
routes.get('/', UsersController.index);
routes.get('/:id', UsersController.show);
// UPDATE
routes.get('/edit/:id', UsersController.updateGet);
routes.post('/edit/:id', UsersController.updatePost);
// DELETE
routes.get('/delete/:id', UsersController.destroy);

module.exports = routes;