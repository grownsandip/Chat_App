import React, { useState } from 'react'
import "./login.css";
import { toast } from 'react-toastify';
const Login = () => {
    const [avatar,setAvatar]=useState({
        file:null,
        url:"",
    })
    const handleAvatar=(e)=>{
        if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
    }
    }
    const handleLogin=(e)=>{
        e.preventDefault()
        toast.success("form submitted")
    }
  return (
    <div className='login'>
      <div className="item">
        <h2>Welcome Back</h2>
        <form action=''>
            <input type='text' placeholder='email' name="email"/>
            <input type='password' placeholder='password' name="password"/>
            <button>Sign In</button>
        </form>
      </div>
      <div className="seperator"></div>
      <div className="item">
      <h2>Create an Account</h2>
        <form onSubmit={handleLogin}>
            <label htmlFor='file'>Upload an Image
            <img src={avatar.url || "./avatar.png"} alt=""/>
            </label>
            <input type='file' id='file' style={{display:"none"}} onChange={handleAvatar}/>
            <input type='text' placeholder='UserName' name="username"/>
            <input type='text' placeholder='email' name="email"/>
            <input type='password' placeholder='password' name="password"/>
            <button>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default Login
