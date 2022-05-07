import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Synthesizer from "./components/pages/synthesizer";
import Login from "./components/pages/login";
import Navbar from './components/pages/navbar';
import Profile from './components/pages/profile';
import Social from './components/pages/social';
import {GlobalProvider} from './components/context/GlobalState'

class App extends Component {

  render() {
    return (
      <>
      <GlobalProvider>
      <Router>
        <Navbar />
          <div className="Pages">
            <Routes>
            <Route path='/' element={<Synthesizer/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/social' element={<Social/>} />
            </Routes>
          </div>
        </Router>
      </GlobalProvider>
      </>
    );
  }
}

export default App;
