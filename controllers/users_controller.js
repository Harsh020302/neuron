
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req,res){
    try{
        let user = await User.findById(req.params.id);
        return res.render('user_profile',{
            title: 'User Profile', 
            profile_user : user
        });
    }catch(error){
        console.log('error',error);
    }
    
}

module.exports.update = async function(req,res){
    try{
        if(req.user.id == req.params.id){
            let user = await User.findByIdAndUpdate(req.params.id,req.body);
            // User.uploadedAvatar(req,res,function(err){

            //     if(err){
            //         console.log('****Multer Error****',err);
            //     }
            //     user.name = req.body.name;
            //     user.email = req.body.email;
            //     // console.log(req.file);
                
            //     if(req.file){

            //         if(user.avatar){
            //             fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            //         }

            //         user.avatar = User.avatarPath + '\\' + req.file.filename;
            //     }
            //     user.save();
                return res.redirect('back');
            //})
        }
        else{
            return res.status(401).send('Unauthorized');
        }
    }
    catch(error){
        console.log('error',error);
    }
    
}

module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'Sign Up'
    });
}

module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: 'Sign In'
    });
}

module.exports.destroySession =  function(req,res){
    req.logout(function(err) {
        if (err) { console.log('Error in logging out') }
    });
    req.flash('success','Logged Out Successfully');
    return res.redirect('/');
}

module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}