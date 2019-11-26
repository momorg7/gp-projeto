let Post = require('../models/post');
let User = require('../models/User');
let db = require('../mongoConnection');

module.exports = {
    createGet: (req, res)=>{
        res.render('create_post');
    },

    createPost: (req, res)=>{
        const post = {
            title: req.body.title,
            author: req.user._id,
            body: req.body.body
        }

        Post.create(post, (err)=>{
            if(err){
                console.log(err);
                let result = encodeURIComponent('dangerErro ao adicionar o Post');
                res.redirect('/?valid='+ result);
            }
            else{
                console.log(post);
                //res.redirect('/');
                let result = encodeURIComponent('successPost Adicionado com sucesso');
                res.redirect('/?valid='+ result);
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
                User.findById(post.author, (err, user)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    else{
                        let canEditAndDelete = true;

                        let title = post.title;

                        

                        if(req.user._id != post.author){
                            canEditAndDelete = false;
                        }

                        console.log(canEditAndDelete);
                        //console.log(req.flash('msg1'));

                        res.render('post', {
                            post: post,
                            authorName: user.nome,
                            canEditAndDelete
                        });
                    }
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
        post = {
            title: req.body.title,
            body: req.body.body
        }

        Post.findByIdAndUpdate(req.params.id, post, { new: true, useFindAndModify: false }, (err)=>{
            if(err){
                console.log(err);

                let result = encodeURIComponent('dangerErro ao atualizar o Post');
                res.redirect('/?valid='+ result);
            }
            else{
                //res.redirect('/');

                let result = encodeURIComponent('successPost Atualizado com sucesso');
                res.redirect('/?valid='+ result);
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

                let result = encodeURIComponent('dangerErro ao deletar o Post');
                res.redirect('/?valid='+ result);
            }
            else{
                //res.redirect('/');

                let result = encodeURIComponent('successPost Deletado com sucesso');
                res.redirect('/?valid='+ result);
            }
        });
    },

    ensureAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        else{
            console.log('Acesso nao permitido');
            res.redirect('/login');
        }
    }
}