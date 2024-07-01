const express = require('express');
const router = express.Router();
const {follows , unsubscribe , getFollowing , getFollowers , detail} = require('./controllers');
const {isAuthor} = require('../post/middlewares')
const passport = require('passport')


router.post('/api/follow',passport.authenticate('jwt', { session: false }),follows);
router.delete('/api/unsubscribe',passport.authenticate('jwt', { session: false }),unsubscribe);
router.get('/api/users/:username/following' , getFollowing )
router.get('/api/users/:username/followers' , getFollowers )
router.get('/api/user/:username' , detail )

module.exports =router