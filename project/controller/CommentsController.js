let Comment = require('../models/Comment');

module.exports = {
    createPost: (req, res)=>{
        console.log(req.user._id);
        //console.log(req.body);
        const comment = {
            authorId: req.user._id,
            postId: req.body.postId,
            body: req.body.commentPost
        }

        Comment.create(comment, (err, data)=>{
            if(err){
                console.log(err);
            }

            console.log(data);
        });
    }   
}