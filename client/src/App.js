import logo from './logo.svg';
import React,{useState,useEffect} from 'react'
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";


import Home from './container/home';
import Login from './components/auth/login';
import Signup from './components/auth/signup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

const App=()=>{
  console.log(process.env.REACT_APP_BACKEND_UR)
  const navigate = useNavigate()
  const [isAuth,setIsAuth] = useState(false);
  const [userId,setUserId] = useState(null)
  const [accountId, setAccountId] = useState(null)
  const [error,setError] = useState(null)
  const [token,setToken] =useState(null)
  
 useEffect(()=>{
   
  console.log('Component did mount, App')
  const token = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiryDate');
  if (!token || !expiryDate) {
    return
  }
  if (new Date(expiryDate) <= new Date()) {
    logoutHandler();
    return;
  }

  const userId = localStorage.getItem('userId');
  const accId = localStorage.getItem('accId');
  const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
  setAccountId(accId)
  setToken(token);
  setUserId(userId);
  setIsAuth(true)
  setAutoLogout(remainingMilliseconds);
  console.log(accId)
 },[isAuth])


  const logoutHandler = () => {
   
    setToken(null);
   
    setIsAuth(false)
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('accId');
    console.log('Logged out')
    navigate("/login")
  }

  const signupHandler = (userData) => {
     
    axios.post(`https://expensecalculator123.herokuapp.com/signup`, userData,{headers: {
      'Content-Type': 'application/json',
  }})
    .then(res => {
      console.log(res)
      if (res.status === 422) {
        console.log(res)
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {

        console.log(res)
        throw new Error('create user failed')

      }
   
      console.log(res)
     navigate('/login')
    }).catch(err => {
      setError(err)
      console.log(err)
    })
  }

  const loginHandler = (loginData) => {

    console.log(loginData);
    axios.post('https://expensecalculator123.herokuapp.com/login', loginData,
    {headers: {
      'Content-Type': 'application/json',
  }}).then(res => {

      console.log(res)
      if (res.status === 422) {
        throw new Error('Validation failed.');
      }
      if (res.status === 401) {
        throw new Error('Email is incorrect!');
      }
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Login failed')
      }

     const resData = res.data

      setIsAuth(true)
      setToken(resData.token)
      setAccountId(resData.accountId)
     
      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId)
      localStorage.setItem('accId', resData.accountId)
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
     setAutoLogout(remainingMilliseconds);
      console.log('success')
      navigate("/")

    }).catch(err => {
      console.log(err)

      setIsAuth(false)
      setError(err)
    
    })


  }
  const setAutoLogout = milliseconds => {
    setTimeout(() => {
     logoutHandler();
    }, milliseconds);
  };



    return (
      <>

        <div className="App">
          <Routes>
            <Route>
              <Route path="/" element={<Home token={token} isAuth={isAuth} accId={accountId}/>} />
              <Route path="/login" element={<Login error={error} clicked={loginHandler} />} />
              <Route path="/signup" element={<Signup error={error} clicked={signupHandler} />} />
            </Route>
          </Routes>
        </div>
      </>
    );
  }



export default App
