const mongoose = require('mongoose');
let User = require('../models/User'); //aaaaaaaaaaaaaaa
//const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(req, res) {
       /* const users = await User.find();

       res.render('index_user', {
           users
       }); */

       User.find({}, (err, users)=>{
            if(err){
                /* console.log(err.message);
                return; */
                let string = req.query.valid;
                //console.log(string);
                let type = string.slice(0, 6);
                let message = string.slice(6, string.length);

                console.log(type);
                console.log(message);

                res.render('index_user', {
                    users,
                    string,
                    info: {
                        type,
                        message
                    }
                });
            }
            else{
                //req.flash('msg1', 'hate');
                if(req.query.valid){
                    console.log(req.query.valid);
                    let string = req.query.valid;
                    //console.log(string);
                    let type = string.slice(0, 7);
                    let message = string.slice(7, string.length);

                    console.log(type);
                    console.log(message);

                    res.render('index_user', {
                        users,
                        string,
                        info: {
                            type,
                            message
                        }
                    });
                }
                else{
                    console.log('no string');

                    res.render('index_user', {
                        users
                    });
                }
            }
       });
    },

    async show(req, res) {
        const user = await User.findById(req.params.id);

        res.render('user', {
            user
        })
    },

    async storeGet(req, res) {
        res.render('create_user');
    },

    async storePut(req, res) {
        const user = {
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password
        }

        /* if(user.email === process.env.admin){
            User.find({ email: process.env.admin }, (err, test)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(test);
                }
            });
        } */

        // usuarios diferentes nao podem ter o mesmo email
        User.find({ email: user.email }, (err, result)=>{
            if(err){
                console.log(err);
            }
            
            if(result.length !== 0){
                console.log(result);
                console.log('Usuário já existente. At StorePut');
                res.redirect('/login');
            }
            else{
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(user.password, salt, (err, hash)=>{
                        user.password = hash;
                        User.create(user, (err, user)=>{
                            //console.log(user);
                            if(err){
                                console.log(err);
                                let result = encodeURIComponent('dangerErro ao adicionar o Usuário');
                                res.redirect('/?valid='+ result);
                            }
                            else{
                                //console.log(user);
                                let result = encodeURIComponent('successUsuário Adicionado com sucesso');
                                res.redirect('/?valid='+ result);
                                //res.redirect('/login');
                            }
                        }); 
                    }); 
                });
            }
        });

        /* bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password = hash;
                user.save((err)=>{
                    if(err){
                        console.log(err);
                        let result = encodeURIComponent('dangerErro ao adicionar o Usuário');
                        res.redirect('/?valid='+ result);
                    }
                    else{
                        let result = encodeURIComponent('successUsuário Adicionado com sucesso');
                        res.redirect('/?valid='+ result);
                        //res.redirect('/login');
                    }
                }); 
            }); 
        }); */

        /* if(err){
            console.log(err);
            let result = encodeURIComponent('dangerErro ao adicionar o Post');
            res.redirect('/?valid='+ result);
        }
        else{
            console.log(post);
            //res.redirect('/');
            let result = encodeURIComponent('successPost Adicionado com sucesso');
            res.redirect('/?valid='+ result);
        } */

       /* User.create(req.body, (err)=>{
            if(err){
                console.log(err);
                return;
            }
            else{
                res.redirect('/');
            }
        }); */
    },

    async updateGet(req, res){
        User.findById(req.params.id, (err, user)=>{
            if(err){
                console.log(err);
                return;
            }
            else{
                res.render('update_user', {
                    user
                });
            }
        });
    },

    async updatePost(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/');
            }
        });
    },

    async destroy(req, res) {
        User.findByIdAndRemove(req.params.id, (err)=>{
            if(err){
                console.log(err);
                return;
            }
            else{
                res.redirect('/');
            }
        });
    },

    async loginGet(req, res){
        res.render('login_user');
    },

    async loginPost(req, res){
        
    },
}