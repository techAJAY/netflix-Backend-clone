const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//update user
exports.updateUser = async (req, res) => {
  try {
    console.log("hii");
    const requestBody = req.body;
    const userId = req.params.id;

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(403).json("user not found!");
    }

    const updatedUser = await User.findByIdAndUpdate(user, requestBody, {
      new: true,
    });
    return res.status(200).json({ message: "USER UPDATED SUCCESSFULLY" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE users
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete({ _id: userId });

    return res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  //   res.status(403).json("You can delete only your account!");
  // }
};

//ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const getallData = await User.find({ isAdmin:true});

    if (!getallData) {
      return res.status(400).send({ message: "you are not allow to get data" });
    }

    return res.status(200).send({ message: "YOU ALL Data", data: getallData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err });
  }
}


//-------get api for single users ---------//

exports.getOneUsers = async (req, res) => {
  try {

    const userId = req.params.id;
    const responseData = await User.findOne({
      _id:userId,
      userId:req.user._id,
    });
    if (responseData) {
      return res.status(200).send({ status: true, data: responseData });
    }
    return res.status(404).send({ status: false, msg: "product not exist" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};



//GET USER STATS
    exports.userStats  =  async (req, res) => {

    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $year:"$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  };