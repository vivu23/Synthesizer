import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Synthesizer from "./components/pages/synthesizer";
import Login from "./components/pages/login";
import Navbar from './components/pages/navbar';
import Profile from './components/pages/profile';
import Social from './components/pages/social';
import About from './components/pages/about';

class App extends Component {

  render() {
    return (
      <>
        <Router>
        <Navbar/>
          <div className="Pages">
            <Routes>
            <Route path='/' element={<Synthesizer/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/social' element={<Social/>} />
            <Route path='/about' element={<About/>} />
            </Routes>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
