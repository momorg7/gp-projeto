const express = require('express');
const routes = express.Router();
let Comment = require('../models/Comment');
let CommentsController = require('../controller/CommentsController');

routes.post('/create', CommentsController.createPost);

routes.get('/edit/:id', CommentsController.updateGet);
routes.post('/edit/:id', CommentsController.updatePost);

routes.get('/delete/:id', CommentsController.deletePost);

module.exports = routes;