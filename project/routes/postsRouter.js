const express = require('express');
const routes = express.Router();
//const mongoose = require('mongoose');
let db = require('../mongoConnection');
let PostsController = require('../controller/PostsController');

// CREATE
routes.get('/create', PostsController.createGet);
routes.post('/create', PostsController.createPost);

// READ ONLY
routes.get('/:id', PostsController.readGet);

// UPDATE
routes.get('/edit/:id', PostsController.updateGet);
routes.post('/edit/:id', PostsController.updatePost),

// DELETE
routes.get('/delete/:id', PostsController.deleteGet),

module.exports = routes;