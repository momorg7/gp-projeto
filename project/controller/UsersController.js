const mongoose = require('mongoose');
let User = require('../models/User'); //aaaaaaaaaaaaaaa
//const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(req, res) {
       const users = await User.find();

       res.render('index_user', {
           users
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
        const user = new User({
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password = hash;
                user.save((err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    else{
                        res.redirect('/login');
                    }
                });
            });
        });

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