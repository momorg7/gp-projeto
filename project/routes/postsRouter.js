const express = require('express');
const routes = express.Router();
//const mongoose = require('mongoose');
let Post = require('../models/post');
let db = require('../mongoConnection');

/* mongoose.connect('mongodb://localhost/postsDatabase');
let db = mongoose.connection;

db.once('open', ()=>{
    console.log('Conectado ao Mongodb');
});

db.on('error', (err)=>{
    console.log(err);
}); */

// CREATE
routes.get('/create', (req, res) => {
    console.log('oi')
    res.render('create_post');
});

routes.post('/create', (req, res)=>{
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
});

// READ ONLY
routes.get('/:id', (req, res)=>{
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
});

// UPDATE
routes.get('/edit/:id', (req, res)=>{
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
});

routes.post('/edit/:id', (req, res)=>{
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
});

// DELETE
routes.get('/delete/:id', (req, res)=>{
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
});

module.exports = routes;