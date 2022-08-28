const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const Post = new Schema(
{
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        required:false
    },
    photo: {
        type: String,
        required: false,
      }
},
    {timestamps:true},

); 
module.exports = mongoose.model("Post",Post)