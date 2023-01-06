module.exports.profile = function(req,res){
    return res.render('users',{
        title: 'Users'
    });
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Sign Up'
    });
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: 'Sign In'
    });
}