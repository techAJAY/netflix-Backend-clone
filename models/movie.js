const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{type:String,require:true,unique:true},
    desc:{type:String},
    image:{type:String},
    imageTitle:{type:String},
    imageSmall:{type:String},
    trailer:{type:String},
    video:{type:String},
    ageLimit:{type:Number},
    genre:{type:String},
    isSeries:{type:Boolean, default: false},
},{timestamps:true})

module.exports = mongoose.model('movies',movieSchema)
