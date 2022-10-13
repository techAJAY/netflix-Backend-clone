const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')




router.post('/register',userController.createUser)
router.post('/userLogin',userController.userLogin)



module.exports = router