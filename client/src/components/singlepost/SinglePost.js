import './singlePost.css'
import {faLessThanEqual, faPenToSquare,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router';
import axios from 'axios';
import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import apiUrl from '../../apiConfig';
import { useNavigate } from 'react-router';

export default function SinglePost() {
  const location = useLocation();
  const {user} = useContext(Context)
const navigate = useNavigate()
  //console.log('location',location.pathname.split("/")[2])
  const path = location.pathname.split("/")[2]
  const [post,setPost] =useState({})
  //to create a new post using write icon
  const [description,setDescription]=useState("")
  const [title,setTitle]=useState("")
  const [updateMode,setUpdateMode]=useState(false)
  const [photo,setPhoto] = useState("")



  useEffect(()=>{
    const getPost = async()=>{
      const res = await axios.get(`${apiUrl}/posts/`+path);
      console.log('res',res)

      
      setPost(res.data)
      setTitle(res.data.title)
      setDescription(res.data.description)
      setPhoto(res.data.photo)

    };
    getPost()
  },[path])
  
  // const PF = "/images/"

//const PF = "http://localhost:5000/images/"

const handleDelete =async()=>{
  try{

  
  await axios.delete(`/posts/${post._id}`,{data:{username:user.username}});
  // window.location.replace("/")
  navigate("/")
  }catch(err){

  }
}

//UPDATE
const handleUpdate= async()=>{
  try{

  
    await axios.put(`${apiUrl}/posts/${post._id}`,{username:user.username,title,description,photo});
    //window.location.reload()
    setUpdateMode(false)
    }catch(err){
  
    }
}



  return (
  
    <div className ="singlePost">
      <div className = "singlePostContainer">
        {post.photo ? (
      <img className="singlePostImg" src={post.photo} alt=""/>
      ) :(
        <img className="singlePostImg" src="https://images.unsplash.com/photo-1565118531796-763e5082d113?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt=""/>
      )}

      {/* UPDATING A POST */}
      {updateMode? (
        <>
        <input type = "text" placeholder="Insert image URL" className="singlePostTitleInput"
        
        onChange={(e)=>setPhoto(e.target.value)}/>

      <input type = "text" value = {title} className="singlePostTitleInput"
      autoFocus
      onChange={(e)=>setTitle(e.target.value)}/>
      </>
      ) : (

        <h1 className="singlePostTitle">
            {title}
            
               
               {user && post.username === user.username && (
                <div className="singlePostEdit">
               <FontAwesomeIcon className="singlePostIcon" icon={faPenToSquare}
               onClick={()=>setUpdateMode(true)}/>
               
               <FontAwesomeIcon  className="singlePostIcon" icon={faTrashCan}
               onClick={handleDelete}/>
               </div>
               )}
               
              
            
              
            
            </h1>

      ) }
      
        
        <div className="singlePostInfo">
            <span className="singlePostAuthor">Author:
            <Link to={`/?user=${post.username}`} style={{textDecoration:"none",color:"#b39656"}}>
            <b>{post.username}</b>
            </Link>
            </span>
            <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>

        </div>
        { updateMode?  (
          <textarea 
          className="singlePostDescInput"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}/>
        ) : (
        <p className="singlePostDesc">{description}</p>
        )
        }   
        {updateMode && (
        <button className="singlePostButton" onClick={handleUpdate}>Update Post</button>
      
     
        )
        }
         </div>
    </div>
  )
}