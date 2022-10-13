const Movies = require("../models/movie");
const User = require("../models/user");
const CryptoJS = require("crypto-js");





//create movies
exports.createMovies = async (req,res)=>{
    try{
        
    const user = await User.findOne({isAdmin:true})
    if(!user){
        return res.status(403).send({message:"you are not allowed to  access this resource "})
    }

    const {title,desc,image,imageTitle,imageSmall,trailer,video,ageLimit,genre,isSeries}  = req.body;
    
    const movies = new Movies({

    title:title,
    desc:desc,
    image:image,
    imageTitle:imageTitle,
    imageSmall:imageSmall,
    trailer:trailer,
    video:video,
    ageLimit:ageLimit,
    genre: genre,
    isSeries:isSeries, 

        })
    
        const moviesData = await movies.save()
        return res.status(201).send({msg:"movie added successfully",data:moviesData})
    

    }catch(err){
        res.status(500).send(err)
    }
        
}
    
    



//update Movies
exports.updateMovies = async (req, res) => {
  try {
    console.log("hii");
    const isAdmin = await User.findOne({isAdmin:true})
    if(!isAdmin){
        return res.status(403).send({message:"you are not allowed to  access this resource "})
    }

    const requestBody = req.body;
    const userId = req.params.id;
    const user = await Movies.findById({ _id: userId });
    if (!user) {
      return res.status(403).json("user not found!");
    }

    const updatedUser = await Movies.findByIdAndUpdate(user, requestBody, {
      new: true,
    });
    return res.status(200).json({ message: "Movies UPDATED SUCCESSFULLY" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE Movies
exports.deleteMovies = async (req, res) => {
  try {
    const isAdmin = await User.findOne({isAdmin:true})
    if(!isAdmin){
        return res.status(403).send({message:"you are not allowed to  access this resource "})
    }

    const userId = req.params.id;
    await Movies.findByIdAndDelete({ _id:userId });

    return res.status(200).json("Movies has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  //   res.status(403).json("You can delete only your account!");
  // }
};


//ALL Movies
exports.getAllMovies = async (req, res) => {
  try {

    const isAdmin = await User.findOne({isAdmin:true})
    if(!isAdmin){
        return res.status(403).send({message:"you are not allowed to  access this resource "})
    }

    const data = await Movies.find();

    return res.status(200).send({ message: "YOUR ALL Data", data:data });
  } catch (err) {
    res.status(500).send({ status: false, msg: err });
  }
}


//-------get api for single Movies ---------//

exports.getOneMovies = async (req, res) => {
  try {

    const isAdmin = await User.findOne({isAdmin:true})
    if(!isAdmin){
        return res.status(403).send({message:"you are not allowed to  access this resource "})
    }

    const userId = req.params.id;
    const responseData = await Movies.findOne({
      _id:userId,
      userId:req.user._id,
    });
    if (responseData) {
      return res.status(200).send({ status: true, data: responseData });
    }
    return res.status(404).send({ status: false, msg: "Movies not exist" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};



//GET RANDOM
    exports.random  =  async (req, res) => {
        
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movies.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movies.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  