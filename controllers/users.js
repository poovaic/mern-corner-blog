const router =require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


//UPDATE USER
const updateUser = async (req, res) =>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
    try{ 
        //update user and send new data 
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:req.body,  
        },
        {
            new:true
        }
        );
        return res.status(200).json(updatedUser)
    }catch(err){
        return res.status(500).json(err);
    }
    }else{
        return res.status(401).json("You can update only your account")
    }
};
//GET USER
const getUser = async (req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(user){
        const { password, ...others } = user._doc;
        return res.status(200).json(others);    
        }
        
        else{
            return res.status(404).send('User with the specified ID does not exist')
        }
        
        
      } catch (err) {
        return res.status(500).send(err.message);
      }
    }



//DELETE USER

const deleteUser = async (req, res) =>{

    if(req.body.userId === req.params.id){
        //need to delete user details as well as their posts
 
        // condition to find user first
        try{
         const user = await User.findById(req.params.id);
         //to delete user details and posts
         try{ 
             
             await User.findByIdAndDelete(req.params.id)
             //Post.deleteMany({username:user.username})
             return res.status(200).json("User has been deleted!!!");
         }catch(err){
             return res.status(500).json(err);
         }
 
        }
        catch(err){
         return res.status(404).json("User not found");
 
        }
     
     }else{
         return res.status(401).json("You can delete only your account")
     }
 }

 module.exports = {
    updateUser,
    getUser,
    deleteUser
    
}