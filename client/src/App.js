import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Synthesizer from "./components/pages/synthesizer";

import './App.css';

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <div className="Pages">
            <Routes>
            <Route path='/' element={<Synthesizer/>} />
            </Routes>
          </div>
        </Router>
      </>
    );
  }
}

export default App;