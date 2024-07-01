const express = require('express')
const router = express.Router()
const  {sendPassword , login, editProfile} = require('./controllers')
const {isAuthor} = require('../post/middlewares')
router.post('/api/auth/send-email' , sendPassword)
router.post('/api/auth/login' , login)
router.put('/api/profile/edit/:id'  , editProfile)
module.exports = router