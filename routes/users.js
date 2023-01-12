const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');

router.get('/',function(req,res){
    return res.render('user_profile',{
        title: 'Users'
    });
})
router.get('/profile',passport.checkAuthentication ,userController.profile);
router.get('/posts',postsController.posts);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.get('/destroySession',userController.destroySession);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) ,userController.createSession);

module.exports = router;