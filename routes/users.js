const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');

router.get('/',function(req,res){
    res.end('<h1>Users</h1>');
})
router.get('/profile',userController.profile);
router.get('/posts',postsController.posts);

module.exports = router;