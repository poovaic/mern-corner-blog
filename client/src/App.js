import { Routes, Route} from "react-router-dom";
import React, { Component }  from 'react';
import { Context } from "./context/Context";
import './App.css';
import Header from './components/Header/Header';
import Home from './Screens/Home/Home';
import Blog from './Screens/Blog/Blog';
import Write from './Screens/Write/Write';
import Settings from './Screens/Settings/Settings';
import Login from './Screens/Login/Login';
import Register from './Screens/Register/Register';
import { useContext } from "react";



function App() {
  const {user} = useContext(Context);
  
  return (
      
    <div>
    
        <Header/>

        <Routes>
        
        <Route exact path="/" element={<Home/>}/>
     
        <Route path="/register" element = {user ? <Home/> : <Register />}/>
        
        <Route path="/login" element = {user ? <Home/> : <Login/>}/>
        
        <Route path="/write" element={user ? <Write/> : <Register />}/>
        
        <Route path="/settings" element= {user ? <Settings /> : <Register />}/>
        
        <Route path="/post/:postId" element ={
          <Blog/>}/>
        </Routes>
     
      
    </div>
  );
}

export default App;