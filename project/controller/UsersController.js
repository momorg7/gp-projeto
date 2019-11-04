const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
       const users = await User.paginate({}, { page, limit: 10 });

       return res.json(users);
    },

    async show(req, res) {
        const user = await User.findById(req.params.id);

        return res.json(user);
    },

    async store(req, res) {
        const user = await User.create(req.body);

        return res.json(user);
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