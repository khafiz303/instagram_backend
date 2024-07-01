const express = require('express');
const router = express.Router();
const {upload} = require('../post/multer');
const {createStory , deleteStory , getStory} = require('./controllers');
const {isAuthor} = require('../post/middlewares')
const passport = require('passport')


router.post('/api/story/create',passport.authenticate('jwt', { session: false }),
 upload.single('imageUrl'), createStory);

 router.post('/api/story/delete/:id',passport.authenticate('jwt', { session: false }),
 upload.single('imageUrl'), deleteStory);

 router.get('/api/story', getStory);

 

module.exports =router