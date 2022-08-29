import './sidebar.css'
import React, { Component }  from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';
import img from './about_me.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter,faInstagram,faFacebook,faPinterest } from '@fortawesome/free-brands-svg-icons';
import { useState,useEffect } from 'react';
export default function SideBar() {
  const[cat,setCat]=useState([])

  useEffect(()=>{
    const getCats = async ()=>{
      const res = await axios.get(`${apiUrl}/categories`)
    setCat(res.data)
    };
    getCats()
  },[])


  return (
    <div className="sidebar">
      <div className="sidebarItem">
        {/* <span className="si debarTitl">
          ABOUT ME
        </span> */}
        <a href="https://github.com/poovaic/mern-corner-blog"><FontAwesomeIcon className="sidebarTitleIcon" 
        icon={faGithub}/>
        </a>
        <img className="about_me_img" src={img} alt=""/>
        <p>
          Hello! Welcome to 'The Blog on the Corner'. It's a MERN Stack App developed by Poovai.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map((c)=>(
            <li className="sidebarListItem">{c.name}</li>
          ))}
          </ul>
      </div>
      <div className="sidebarItem">
      <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
      <FontAwesomeIcon className="sidebarIcon" icon={faTwitter} />
      <FontAwesomeIcon className="sidebarIcon" icon={faFacebook} />
      <FontAwesomeIcon className="sidebarIcon" icon={faPinterest} />
      <FontAwesomeIcon className="sidebarIcon " icon={faInstagram} />
        </div>
      </div>


    </div>
  );
}