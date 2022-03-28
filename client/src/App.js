import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Synthesizer from "./components/pages/synthesizer";
import Login from "./components/pages/login";
import Navbar from './components/pages/navbar';

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
            </Routes>
          </div>
        </Router>
      </>
    );
  }
}

export default App;