let Post = require('../models/post');
let db = require('../mongoConnection');

module.exports = {
    createGet: (req, res)=>{
        res.render('create_post');
    },

    createPost: (req, res)=>{
        Post.create(req.body, (err)=>{
            if(err){
                console.log(err);
                return;
            }
            else{
                res.redirect('/');
            }
        });
    },

    readGet: (req, res)=>{
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
    },

    updateGet: (req, res)=>{
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
    },

    updatePost: (req, res)=>{
        Post.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false }, (err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/');
            }
        });
    },

    deleteGet: (req, res)=>{
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
    }
}