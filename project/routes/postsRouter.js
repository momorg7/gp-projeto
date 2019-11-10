const express = require('express');
const routes = express.Router();
//const mongoose = require('mongoose');
let db = require('../mongoConnection');
let PostsController = require('../controller/PostsController');

// CREATE
routes.get('/create', PostsController.ensureAuthenticated, PostsController.createGet);
routes.post('/create', PostsController.createPost);

// READ ONLY
routes.get('/:id', PostsController.ensureAuthenticated, PostsController.readGet);

// UPDATE
routes.get('/edit/:id', PostsController.ensureAuthenticated,PostsController.updateGet);
routes.post('/edit/:id', PostsController.updatePost),

// DELETE
routes.get('/delete/:id', PostsController.ensureAuthenticated, PostsController.deleteGet),

module.exports = routes;