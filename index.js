const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const movieRoute = require('./routes/movieRoute')
const listRoute = require('./routes/list')
//const cors = require('cors')
const mongoose =  require('mongoose')
const dotenv = require('dotenv')

//env path config
dotenv.config()


//mongoDB connection
mongoose.connect(process.env.DB)
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.get('/get', (req, res) => {
  res.send('Hello World!')
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.use(userRouter)
app.use(authRouter)
app.use(movieRoute)
app.use(listRoute)


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})