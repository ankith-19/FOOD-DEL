import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import axios from "axios";

const LoginPopup = ({setShowLogin}) => {
  const {url,setToken} = useContext(StoreContext);

  const [currState,setCurrState] = useState("Log in")
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  });
  
  const onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setData(data=>({...data,[name]:value}))
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if(currState==="Log in") {
      newUrl += "/api/user/login";
    }else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl,data);

    if(response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
      if(currState==="Log in") {
        toast.success("You've logged in successfully.");
      }else {
        toast.success("Registration complete!");
      }
    }else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
            {currState==="Log in"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter your name' required/>}
            <input type="email" placeholder='Enter your email' onChange={onChangeHandler} name='email' value={data.email} required/>
            <input type="password" placeholder='password' onChange={onChangeHandler} name='password' value={data.password} required/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Log in"}</button>
        <div className="login-popup-condition">
            <input type="checkbox"/>
            <p>By continuing, i agree to the terms & privacy policy.</p>
        </div>
        {currState==="Log in"?<p>Create a new account?<span onClick={()=>setCurrState("Sign Up")}> Click here</span></p>:<p>Already have an account?<span onClick={()=>setCurrState("Log in")}> Log in here</span></p>}
      </form>
    </div>
  );
}

export default LoginPopup;
