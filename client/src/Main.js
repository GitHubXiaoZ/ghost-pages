/*imports*/
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import jwt_decode from "jwt-decode"
import { setAuthToken } from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"
import { resetCurrentProfile } from "./actions/profileActions"

import { Provider } from "react-redux"
import store from "./store"

import Navbar from "./components/layout/Navbar"
import Home from "./components/layout/Home"
import Footer from "./components/layout/Footer"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoute from "./components/protected-route/PrivateRoute"
import NewProfile from "./components/profile/new_profile"

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken
  setAuthToken(token)
  const decoded = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(resetCurrentProfile())
    window.location.href = "./login"
  }
}

class Main extends Component {
    render() {
        return (
          <Provider store = {store}>
            <Router>
              <div className="main">
                <Navbar/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/new_profile" component={NewProfile}/>
                </Switch>
              </div>
              <Footer/>
            </Router>
          </Provider>
        )
      }
    }
//export main page
export default Main;