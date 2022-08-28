import './register.css'
import { Link, useNavigate  } from 'react-router-dom';
import React, { Component }  from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../apiConfig';

export default function Register() {
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState(false);
  //const message= true;
  const[nav,setNav]=useState(false);
  const navigate = useNavigate()
  
  
  const handleSubmit = async (e)=>{
    //will prevent refreshing page
    e.preventDefault();
    setError(false);
    //API CALL FOR REGISTERING NEW USER 
    try{
    const res = await axios.post(`${apiUrl}/auth/register`,{
      username,
      email,
      password,
     
    })
    // res.data && window.location.replace("/login");
    console.log("register success",res)
    // setErr("Successfull y registered new user")
    res.data && navigate("/login");
    
  }catch(err){
    setError(true)
    console.log(err)

  }
   
  }
   
      // const goToPost = () => {
      //   navigate(`${apiUrl}/login`);
      // };
    
    // useEffect(()=>{
    //   goToPost()
    //   setNav(false)

    // },[nav])
  
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
            <input 
            type="text" 
            className="registerInput" placeholder="Enter your Username"
            onChange={(e)=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="text" 
            className="registerInput"
            onChange={(e)=>setEmail(e.target.value)}placeholder="Enter your email"/>
            <label>Password</label>
            <input type="password"
            className="registerInput"
            onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
            <button className="registerButton">Register</button>
            { error && <h2>This username is already taken!</h2>}
            <button 
            type="submit"
            className="registerLoginButton"><Link style ={{textDecoration:"none",color:"black"}} to="/login">Login</Link></button>


        </form>
      
    </div>
  )
}