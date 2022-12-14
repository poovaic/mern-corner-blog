import './login.css'
import { Link } from "react-router-dom";
import React, { Component }  from 'react';
import { Context } from "../../context/Context";
import { useContext, useRef,useState} from "react";
import axios from "axios";
import apiUrl from '../../apiConfig';


export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  console.log("apiurl",apiUrl)
  const [err,setErr] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false)

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setErr(true)
    }

  };
  //console.log(user)
console.log(isFetching)

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form onSubmit={handleSubmit} className="loginForm">
            <label>Username</label>
            <input 
            type="text" 
            placeholder="Enter your Username"
            ref={userRef}/>
            <label>Password</label>
            <input type="password" placeholder="Enter your password"
            ref={passwordRef}/>
            <button type = "submit" className="loginButton"
            disabled={isFetching}>Login</button>

            <button className="loginRegisterButton">
            <Link style ={{textDecoration:"none",color:"black"}} to="/register">Register</Link></button>


        </form>
        {err && <h2>Wrong Password/Username!!!</h2>}

    </div>
  )
}