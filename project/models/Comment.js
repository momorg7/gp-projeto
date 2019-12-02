let mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

let Comment = module.exports = mongoose.model('Comment', commentSchema);