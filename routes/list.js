const express = require('express')
const router = express.Router()
const listController = require('../controllers/listController')
const {isAuth}  = require('../middleware/auth')



router.post('/createMoviesList',isAuth,listController.createMoviesList)
router.delete('/deleteMoviesList/:id',isAuth,listController.deleteMoviesList)
router.get('/getMoviesList',isAuth,listController.getMoviesList)
 





module.exports = router