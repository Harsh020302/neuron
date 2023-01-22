const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function(req,res){

    try{
        let post = await Post.create({
            content : req.body.content,
            user: req.user.id
        });

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post: post
                },
                message: "Post Created !"
            });
        }

        req.flash('success','Post created');
        return res.redirect('/');
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}


module.exports.destroy = async function(req,res){
    let post = await Post.findById(req.params.id);
    try{
        if(post.user == req.user.id){

            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success','Post deletd');
            return res.redirect('back');

        }
        else{
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }
    }catch(error){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}