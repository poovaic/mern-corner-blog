import './MainBar.css';
import img from './mainbar-img.png'
import React, { Component }  from 'react';


export default function MainBar() {
  return (
    <div className="main-bar">
      
      
      <img className= "mainbar-image" src={img} alt = "mainbar-img"></img>
    </div>
  )
}