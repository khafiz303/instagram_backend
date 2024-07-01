const express = require('express');
const router = express.Router();
const suggestions = require('./controllers');
const passport = require('passport')


router.get('/api/suggestions',passport.authenticate('jwt', { session: false }), suggestions );

module.exports =router