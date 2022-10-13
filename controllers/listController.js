const List = require("../models/list");
const User = require("../models/user");





//create list 
exports.createMoviesList = async (req,res)=>{
    try{
        
    const user = await User.findOne({isAdmin:true})
    if(!user){
        return res.status(403).send({message:"you are not allowed to  access this resource "})
    }

    const {title,type,genre,content}  = req.body;
    
    const ListData = new List({

        title:title,
        type:type,
        genre:genre,
        content:content,

        })
    
        const moviesList = await ListData.save()
        return res.status(201).send({msg:"List added successfully",data:moviesList})
    

    }catch(err){
        res.status(500).send(err)
    }
        
}
    



//DELETE List
exports.deleteMoviesList = async (req, res) => {
    try {
      const isAdmin = await User.findOne({isAdmin:true})
      if(!isAdmin){
          return res.status(403).send({message:"you are not allowed to  access this resource "})
      }
  
      const userId = req.params.id;
      await List.findByIdAndDelete({ _id:userId });
  
      return res.status(200).json("Movies has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }

  };




  //GET movies list   
     exports.getMoviesList =  async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } },
                ]);
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ]);
            }
        } else {
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
}



