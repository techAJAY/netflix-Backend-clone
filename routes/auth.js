const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {isAuth}  = require('../middleware/auth')



router.put('/updateUser/:id',isAuth,authController.updateUser)
router.delete('/deleteUser/:id',isAuth,authController.deleteUser)
router.get('/getUsers',isAuth,authController.getAllUsers)
router.get('/getUsers/:id',isAuth,authController.getOneUsers)
router.get('/userStats',isAuth,authController.userStats)





module.exports = router