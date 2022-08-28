const router =require("express").Router();
const Post = require("../models/Post");


//CREATE POST
const createPost = async (req, res) =>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);

    }
};

//UPDATE POST
const updatePost = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
          try {
            const updatedPost = await Post.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            return res.status(200).json(updatedPost);
          }catch (err) {
            return res.status(500).json(err);
        }
        } else {
          return res.status(401).json("You can update only your post!");
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    };

//DELETE POST

const deletePost = async (req, res) =>{

    try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).send("Post has been deleted!")
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can delete only your post!");
    }
    } catch (err) {
    return res.status(500).json(err);
    }
}

//GET POST
const getPost = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        
        return res.status(200).json(post);
      } catch (err) {
        return res.status(500).json(err);
      }
}; 


//GET ALL POSTS
const getAllPosts = async (req, res) =>{
    const username = req.query.user;
    const categoryName = req.query.category;
    try {
        let posts;
      if(username){
        posts = await Post.find({username}) //username:username
      }else if(categoryName){
        posts = await Post.find({categories:{
            $in:[categoryName]
        }})
    }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
      
    } catch (err) {
      res.status(500).send(err);
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts
    
}