const router =require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs'); //importing hashing package


//REGISTER NEW USER

const registerUser = async (req, res) =>{
    try{ 
        
        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password:hashedPassword,
         });

         const user = await newUser.save();
         return res.status(200).json(user)
    }catch(err){
        return res.status(500).send(err);

    }
};

//LOGIN

const loginUser = async (req, res) =>{
    try{
        
       const user= await User.findOne({username:req.body.username,})

       //if username is incorrect
       if(!user){

       res.status(400).send("Incorrect username")
       
       }
        
    
        const validate = await bcrypt.compare(req.body.password,user.password)
        //if password is incorrect
        if(!validate){

        res.status(400).send("Incorrect password");
        return;
        }
        //sending others except password
        
        const {password, ...others} = user._doc;    
       
        return res.status(200).json(others);
        

    }catch(err){
        return res.status(500).send(err);
    }
}

module.exports = {
    registerUser,
    loginUser
    
}