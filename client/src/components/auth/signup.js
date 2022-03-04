import React, { useState } from "react";
import AuthButton from "../UI/Buttons/Buttons";
// Custom Components
import Input from "../UI/input";
import { AuthHeading } from "../UI/Text/Heading";
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const navigate= useNavigate()
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const clickHandler = () => {
        const userData = { email, username, password }
        props.clicked(userData)
    }



    return (
        <div className="auth-container">
            <div className="login">
                <AuthHeading heading="Sign up" subHeading="Get started for free" />
                <Input
                    value={email}
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    value={username}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
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
                <AuthButton onClick={clickHandler} label="SIGN UP" />
                <p className="auth-footer" onClick={()=>navigate("/login")}>Already have an account? Login</p>
            </div>
        </div>
    );
};

export default SignUp;