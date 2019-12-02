let Comment = require('../models/Comment');

module.exports = {
    createPost: (req, res)=>{
        console.log(req.user._id);
        //console.log(req.body);
        const comment = {
            authorId: req.user._id,
            authorName: req.user.nome,
            postId: req.body.postId,
            body: req.body.commentPost
        }

        Comment.create(comment, (err, data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect(`/posts/${comment.postId}`);
            }
        });
    },
    
    readGet: (req, res)=>{

    },

    updateGet: (req, res)=>{
        /* const id = req.params.id;
        console.log(id); */

        Comment.findById(req.params.id, (err, comment)=>{
            if(err){
                console.log(err);
            }
            else{
                //console.log(comment);

                res.render('update-comment', {
                    comment
                });
            }
        });
    },

    updatePost: (req, res)=>{
        Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false }, (err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('ok');
                res.redirect(`/`);
            }
        });
    }
}