const express = require('express');
const router = express.Router();
const {commentAdd} = require('./controllers');
const passport = require('passport');
// const {isAuthor} = require('./middlewares')

router.post('/api/add-comment', passport.authenticate('jwt', { session: false }),  commentAdd);


module.exports = router;