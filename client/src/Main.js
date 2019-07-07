/*imports*/
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
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
import NotFound from "./components/layout/NotFound"

import Profile from "./components/profile/Profile"
import ProfileList from "./components/profile/profile_list"
import NewProfile from "./components/profile/new_profile"
import EditProfile from "./components/profile/edit_profile"

import ProfilePostList from "./components/post/profile_post_list"
import PostList from "./components/post/post_list"
import Post from "./components/post/post"
import EditPost from "./components/post/edit_post"
import EditComment from "./components/post/comment/edit_comment"

//check local storage for token
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken
  //decode token
  setAuthToken(token)
  const decoded = jwt_decode(token)
  //set user and authenicate
  store.dispatch(setCurrentUser(decoded))

  //check token expiration
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    /*log out user
     *reset the logged in profile
     *redirect to login page
     */
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
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/profile/:handle" component={Profile}/>
                  <Route exact path="/user/:id" component={Profile}/>
                  <Route exact path="/profiles" component={ProfileList}/>
                  <Route exact path="/profiles/posts/:handle" component={ProfilePostList}/>
                  <Route exact path="/notes" component={PostList}/>
                  <Route exact path="/notes/:id" component={Post}/>
                  <PrivateRoute exact path="/notes/edit/:id" component={EditPost}/>
                  <PrivateRoute exact path="/notes/edit/:id/:comment_id" component={EditComment}/>
                  <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                  <PrivateRoute exact path="/new_profile" component={NewProfile}/>
                  <PrivateRoute exact path="/edit_profile" component={EditProfile}/>
                  <Route component={NotFound}/>
                </Switch>
              </div>
              <Footer/>
            </Router>
          </Provider>
        )
      }
    }

/*export main*/
export default Main;