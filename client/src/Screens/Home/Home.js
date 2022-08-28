import React, { useState,useEffect } from 'react'
import MainBar from '../../components/MainBar/MainBar'
import SideBar from '../../components/Sidebar/SideBar'
import Posts from '../../components/Posts/Posts'
import './Home.css'
import axios from "axios"
import { useLocation } from 'react-router'
import apiUrl from '../../apiConfig'
export default function Home() {
  //usestate for sending posts array as props
  const[posts,setPosts] = useState([]);
//usestate for location
//instead of using const location, i can use just the search property
const {search} = useLocation();

//console.log('location',location)

  useEffect(()=>{
    const fetchPosts= async()=>{
      try{
      const res = await axios.get(`${apiUrl}`+"/posts"+search)
      //console.log(res)
      setPosts(res.data)
      }
      catch(error){ 
        console.log(error)
      }
    }
    fetchPosts()
  },[search])

  return (
    <div className="home">
      <>
      <MainBar/>
      </>
      <div className='homepage'>
        <Posts posts={posts}/>
        <SideBar/>
      </div>
      
    </div>
  )
}