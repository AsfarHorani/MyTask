import logo from './logo.svg';
import React from 'react'
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
class App extends React.Component {
  state = {
    
  }



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
