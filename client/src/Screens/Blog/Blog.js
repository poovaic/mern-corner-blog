import './blog.css'
import SideBar from '../../components/Sidebar/SideBar'
import React from 'react'
import SinglePost from '../../components/singlepost/SinglePost'

export default function Blog() {
  return (
    <div className="blog">
      {/* post */}
      <SinglePost/>
      <SideBar/>
    </div>
  )
}