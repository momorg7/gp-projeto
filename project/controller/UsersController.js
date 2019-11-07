const mongoose = require('mongoose');
let User = require('../models/User'); //aaaaaaaaaaaaaaa

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
        const user = {
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password
        }

        User.create(user, (err)=>{
            if(err){
                console.log(err);
                return;
            }
            else{
                res.redirect('/');
            }
        });
    },

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    
        return res.json(user);
    },

    async destroy(req, res) {
        await User.findByIdAndRemove(req.params.id);

        return res.send();
    }
}