import './settings.css'
import React, { useRef }  from 'react';
import { useContext,useState } from 'react';
import SideBar from '../../components/Sidebar/SideBar'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../../context/Context';
import axios from 'axios';
import apiUrl from '../../apiConfig';



export default function Settings() {
  const [file,setFile]=useState(null)
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const[success,setSuccess]=useState(false)
  const{user,dispatch} = useContext(Context)
//const PF = "http://localhost:5000/images/"
const PF= "/images/"




 
const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch({type:"UPDATE_START"})
  const updatedUser = {
    userId: user._id,
    email,
    password,
  };
  if (file) {
    const data =new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);
    updatedUser.profilePic = filename;
    try {
      await axios.post("/upload", data);
    } catch (err) {}
  }
  try {
    const res = await axios.put("/users/"+user._id, updatedUser);
    console.log(user._id)
    console.log(user.profilePic)
    console.log("user has successfully been updated")
    setSuccess(true)
    dispatch({type:"UPDATE_SUCCESS",payload:res.data})

  } catch (err) {
    dispatch({type:"UPDATE_FAILURE"})

  }
};

  return (
    <div className="settings">
      <div className="settingsContainer">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
            <form className="settingsForm"
            onSubmit={handleSubmit} >
                <label>
                    Profile Picture
                </label><div className="settingsPP">
                <img src={file ? URL.createObjectURL(file) : `${apiUrl}`+PF+user.profilePic} alt=""/>
                    </div>
                    <label htmlFor="fileInput"><FontAwesomeIcon settingsPPIcon icon={faUser}/></label>
                    <input type="file" id="fileInput" style={{display:"none"}}
                    onChange={(e)=>setFile(e.target.files[0])} /> 
                                    


                    <label>Username</label>
                    <input type="text" placeholder={user.username}
                    onChange={(e)=>setUsername(e.target.value)}/>

                    <label>Email</label>
                    <input type="text" placeholder={user.email}
                    onChange={(e)=>setEmail(e.target.value)}/>

                    <label>Password</label>
                    <input type="password"
                    onChange={(e)=>setPassword(e.target.value)}/>


                    <button className="settingsSubmit"
                    type="submit">Update</button>

                    {success && <h2>Profile has been updated!!!</h2>}


            </form>
        </div>
      </div>
      <SideBar/>
    </div>
  )
}