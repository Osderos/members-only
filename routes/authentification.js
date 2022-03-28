const express= require('express')
const router=express.Router()

const authentication_controller = require ('../controllers/authenticationController')

//SIGNUP

router.get('/signup', authentication_controller.signup_get)
router.post('/signup', authentication_controller.signup_post)

module.exports = router