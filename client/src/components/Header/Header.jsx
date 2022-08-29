import "./Header.css";
import { Link } from "react-router-dom";
import React from 'react';
import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faSearch,faBars,faX,faBlog} from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react';
import { Context } from "../../context/Context";
import apiUrl from "../../apiConfig";



export default function Header() {
  const {user,dispatch} = useContext(Context);
  const[active, setActive] = useState(false);
  // const PF = "/images/"

  //const PF = "http://localhost:5000/images/"
  //console.log('profilepic',user.profilePic)

  const showMenu = ()=>{
    console.log('onclicktest')
  setActive(!active)
  
  }  
 
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"})  
  }


return (
    <div className='header'>
      {/* hamburger icon */}
      <div className="hamby">
      <FontAwesomeIcon className="hamby-icon" onClick={showMenu} icon={faBars} />
      </div>

      {/* social media icons */}
      {/* <div className="header-1">
      <FontAwesomeIcon className="header-1-icon" icon={faTwitter} />
      <FontAwesomeIcon className="header-1-icon" icon={faFacebook} /><FontAwesomeIcon className="header-1-icon" icon={faPinterest} /><FontAwesomeIcon className="header-1-icon" icon={faInstagram} />
      </div> */}

        <nav className={active? 'navbar active':'navbar'}>
        {/* <div  className="header-2"> */}
        <ul>

          {/* x-icon */}

          <div className='close-icon-div'>
          <FontAwesomeIcon className="close-icon" onClick={showMenu}icon={faX}  />
          </div>
          <>  
        <FontAwesomeIcon className="blog-icon"  icon={faBlog} />
        </>
            <li className="header-menu-item"><Link style= {{textDecoration:"none", color:"inherit"}} to="/">HOME</Link></li>
          
            <li className="header-menu-item"><Link style= {{textDecoration:"none", color:"inherit"}} to="/">CONTACT</Link></li>
            <li className="header-menu-item"><Link style= {{textDecoration:"none", color:"inherit"}} to="/write">WRITE</Link></li>
            {/* <li className="header-menu-item" >{user && <Link OnClick={handleLogout}
            style= {{textDecoration:"none", color:"inherit"}} to="/"  
            >LOGOUT</Link>}</li> */}
             <li className="header-menu-item" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>

            <div>
          
              <FontAwesomeIcon className="header-3-search" icon={faSearch}/> 
            </div>
            
            <div>
              
              { user ? (
           <Link to="/settings"><img className = "header-3-img" src={user.profilePic? user.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt=""/> </Link> 
              ) : (
                 <ul className="header-menu-item">
                 <li className="header-menu-item"><Link style= {{textDecoration:"none", color:"inherit"}} to="/login">LOGIN</Link></li>
                 <li className="header-menu-item"><Link style= {{textDecoration:"none", color:"inherit"}} to="/register">REGISTER</Link>
                 </li>
                 </ul>
                 )
              
                 
                }           
            </div>

          
            
        </ul>
        
      {/* </div> */}

      {/* <div  className="header-3"> */}

      {/* picture and search icon */}
      
       
       
      {/* </div> */}
      
      </nav>

    </div>
      
       
  )
}