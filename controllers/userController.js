const express = require('express')
const User = require('../models/user')
const CryptoJS = require('crypto-js');
const jwt  = require('jsonwebtoken')







//create users
exports.createUser = async (req,res)=>{
    try{
         const {username,email,password,profilePic,isAdmin}  = req.body;
    
        const user = new User({
            username:username,
            email:email,
            password:CryptoJS.AES.encrypt(password,process.env.SECRET_KEY ).toString(),
            profilePic:profilePic,
            isAdmin:isAdmin,
        })
    
        const userData = await user.save()
        res.status(201).send({msg:"user created successfully",data:userData})
    
    }catch(err){
        res.status(500).send(err)
    }
        
    }
    
    


     //LOGIN
     exports.userLogin = async(req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if(!user) {
              return res.status(401).json("Wrong password or username");
            } 
      
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const origPassword = bytes.toString(CryptoJS.enc.Utf8);
            
            if(origPassword !== req.body.password){
              return res.status(401).json("Wrong password or username");
            } 
              
              const access_token = await jwt.sign(
                {id: user._id, role: user.isAdmin},
                process.env.SECRET_KEY,
                {expiresIn: "5d"}
            )
      
            const { password, ...other } = user._doc;
            return res.status(200).json({...other, access_token});
              
              
        } catch (error) {
            res.status(500).json(error);
        }
      }


    