import './post.css'

import React from 'react'
import { Link } from 'react-router-dom'

export default function post({post}) {
 const PF = "http://localhost:5000/images/"
 console.log(post)
 console.log(post.photo)
  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={PF + post.photo} alt=""/>
      )}
      
   

        <div className="postInfo">
            <div className="postCats">
           {post.categories.map((c)=>(
            <span className ="postCat">{c.name}</span>
            
           ))}
            </div>
            <Link to={`/post/${post._id}`} style={{textDecoration:"none",color:"black"}}><span className="postTitle">{post.title}</span></Link>
  
            
            <hr/>
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">{post.description}</p>
    </div>
  )
}