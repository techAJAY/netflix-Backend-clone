const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')
const {isAuth}  = require('../middleware/auth')



router.post('/createMovies',isAuth,movieController.createMovies)
router.put('/updateMovies/:id',isAuth,movieController.updateMovies)
router.delete('/deleteMovies/:id',isAuth,movieController.deleteMovies)
router.get('/getMovies',isAuth,movieController.getAllMovies)
 router.get('/getMovies/:id',isAuth,movieController.getOneMovies)
router.get('/random',isAuth,movieController.random)





module.exports = router