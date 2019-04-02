import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome</h1>
          <a
            className="App-link"
            href="https://www.vervesearch.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Verve Search
          </a>
        </header>
      </div>
    );
  }
}

export default App;
