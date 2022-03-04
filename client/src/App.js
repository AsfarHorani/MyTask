import logo from './logo.svg';
import React from 'react'
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/home';
import Login from './components/auth/login';
import Signup from './components/auth/signup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
class App extends React.Component {
  state = {
    isAuth: null,
    userId: null,
    accountId: null
  }

  componentDidMount = () => {

    console.log(this.state.props)
    console.log('Component did mount, App')
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }

    const userId = localStorage.getItem('userId');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }


  logoutHandler = () => {
    this.setState({ isAuth: false, token: null })
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    console.log('Logged out')
    this.props.history.push('/')
  }

  signupHandler = (userData) => {
    console.log(userData)
    fetch(process.env.API+ 'signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        email: userData.email,
        password: userData.password,
        username: userData.username

      })
    }).then(res => {

      if (res.status === 422) {
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('create user failed')

      }
      return res.json();
    }).then(resData => {
      console.log(resData)
      this.props.history.replace('/login')
    }).catch(err => {
     
      console.log(err)
    })

  }

  loginHandler = (loginData) => {

    console.log(loginData);
    fetch(process.env.API + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password
      })
    }).then(res => {

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

      return res.json()
    }).then(resData => {

    
      this.setState({
        isAuth: true,
        token: resData.token

      })
      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId)
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      this.setAutoLogout(remainingMilliseconds);
      console.log('success')
      this.props.history.push('/')

    }).catch(err => {
      this.setState({  isAuth: false })
      console.log(err)
    })


  }
  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };
 

  render() {
    return (
      <>

        <div className="App">
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </div>
      </>
    );
  }

}

export default App;
