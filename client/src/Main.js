import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"

import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"

class Main extends Component {
    render() {
        return (
          <Router>
            <div className="main">
              <Navbar/>
              <Route exact path="/" component={ Landing } />
          </div>
          </Router>
        )
      }
    }
//export main page
export default Main;