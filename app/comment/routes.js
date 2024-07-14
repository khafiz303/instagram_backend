const express = require('express');
const router = express.Router();
const {commentAdd , commentDelete} = require('./controllers');
const passport = require('passport');
// const {isAuthor} = require('./middlewares')

router.post('/api/add-comment', passport.authenticate('jwt', { session: false }),  commentAdd);
router.delete('/api/delete-comment', passport.authenticate('jwt', { session: false }), commentDelete )

module.exports = router;