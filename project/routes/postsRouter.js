const express = require('express');
const routes = express.Router();
//const mongoose = require('mongoose');
let Post = require('../models/post');
let db = require('../mongoConnection');
let PostsController = require('../controller/PostsController');

/* mongoose.connect('mongodb://localhost/postsDatabase');
let db = mongoose.connection;

db.once('open', ()=>{
    console.log('Conectado ao Mongodb');
});

db.on('error', (err)=>{
    console.log(err);
}); */

// CREATE
/* routes.get('/create', (req, res) => {
    res.render('create_post');
}); */

routes.get('/create', PostsController.createGet);

/* routes.post('/create', (req, res)=>{
    let post = new Post();

    post.title = req.body.title;
    post.author = req.body.author;
    post.body = req.body.body;

    post.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
}); */

routes.post('/create', PostsController.createPost);

// READ ONLY
/* routes.get('/:id', (req, res)=>{
    Post.findById(req.params.id, (err, post)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            res.render('post', {
                post: post
            });
        }
    });
}); */

routes.get('/:id', PostsController.readGet);

// UPDATE
/* routes.get('/edit/:id', (req, res)=>{
    Post.findById(req.params.id, (err, post)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            res.render('update_post', {
                post: post
            });
        }
    });
}); */
routes.get('/edit/:id', PostsController.updateGet);

/* routes.post('/edit/:id', (req, res)=>{
    let post = {}

    post.title = req.body.title;
    post.author = req.body.author;
    post.body = req.body.body;

    let query = {_id: req.params.id};

    Post.update(query, post, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
}); */
routes.post('/edit/:id', PostsController.updatePost),

// DELETE
/* routes.get('/delete/:id', (req, res)=>{
    let query = {
        _id: req.params.id
    }

    Post.deleteOne(query, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
}); */

routes.get('/delete/:id', PostsController.deleteGet),

module.exports = routes;