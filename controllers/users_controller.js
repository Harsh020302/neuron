
const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'Users', 
    });
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

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { console.log('Error in logging out') }
    });

    return res.redirect('/');
}

module.exports.create = function(req,res){
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error while checking user with email id already registered or not');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating new user');
                    return;
                }
                return res.redirect('sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })


}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}