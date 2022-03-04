import React, { useState } from "react";
import AuthButton from "../UI/Buttons/Buttons";
import { useNavigate } from 'react-router-dom'
// Custom Components
import Input from "../UI/input";
import { AuthHeading } from "../UI/Text/Heading";

const Login = (props) => {
    
    const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let err =props.error? <p>{props.error}</p>:null;
  
  const clickHandler = () => {
    const userData = { email, password }
    props.clicked(userData)
}


  return (
    <div className="auth-container">
      <div className="login">
        <AuthHeading heading="Log In" subHeading="Get started for free" />
        <Input
          value={email}
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="terms-box">
          <input type="checkbox" />
          <span>I accept the Terms and Conditions</span>
        </div>
      
        <AuthButton onClick={()=>clickHandler()} label="LOG IN" />
        <p className="auth-footer" onClick={()=>navigate("/signup")}>Create Account Forgot Password?</p>
      </div>
    </div>
  );
};

export default Login;