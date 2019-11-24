const express = require('express');
//const mongoose = require('mongoose');
let db = require('../mongoConnection');
let UsersController = require('../controller/UsersController');
const routes = express.Router();

// LOGIN
//routes.post('/login', UsersController.loginPost)
routes.get('/login', UsersController.loginGet);
// CREATE
routes.post('/create', UsersController.storePut);
routes.get('/create', UsersController.storeGet);
// READ
routes.get('/', UsersController.ensureAuthenticated, UsersController.index);
//routes.get('/:id', UsersController.show);
routes.get('/:id', UsersController.ensureAuthenticated, UsersController.show);
// UPDATE
routes.get('/edit/:id', UsersController.ensureAuthenticated, UsersController.updateGet);
routes.post('/edit/:id', UsersController.updatePost);
// DELETE
routes.get('/delete/:id', UsersController.destroy);

module.exports = routes;