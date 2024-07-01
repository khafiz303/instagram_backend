const express = require('express');
const router = express.Router();
const {upload} = require('./multer');
const {postCreate , getMyPost , 
    getAllPosts, findPost,deletePost , postEdit , getPost } = require('./controllers');
const passport = require('passport');
const {isAuthor} = require('./middlewares')

router.post('/api/post/create',passport.authenticate('jwt', { session: false }), upload.single('imageUrl'), postCreate);
router.get('/api/posts/my',passport.authenticate('jwt', { session: false }), getMyPost);
router.get('/api/posts/all', getAllPosts);
router.get('/api/post/:id', findPost);
router.delete('/api/post/delete/:id', deletePost);
router.put('/api/post/:id',passport.authenticate('jwt', { session: false }),isAuthor, upload.single('imageUrl') , postEdit)
router.get('/api/post/username/:username' ,passport.authenticate('jwt', { session: false }), getPost )

module.exports = router;