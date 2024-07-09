const express = require('express')
const router = express.Router()
const  {signUp , login, editProfile} = require('./controllers')
const {isAuthor} = require('../post/middlewares')
router.post('/api/auth/signup' , signUp)
router.post('/api/auth/login' , login)
router.put('/api/profile/edit/:id'  , editProfile)
module.exports = router
