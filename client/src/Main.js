/*imports*/
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"
import { resetCurrentProfile } from "./actions/profileActions"

//redux
import { Provider } from "react-redux"
import store from "./store"

//layout
import Navbar from "./components/layout/Navbar"
import Home from "./components/layout/Home"
import Footer from "./components/layout/Footer"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoute from "./components/protected-route/PrivateRoute"
import NotFound from "./components/layout/NotFound"

//profile
import Profile from "./components/profile/Profile"
import ProfileList from "./components/profile/profile_list"
import NewProfile from "./components/profile/new_profile"
import EditProfile from "./components/profile/edit_profile"

//post
import Post from "./components/post/post"
import PostList from "./components/post/post_list"
import PostListFilter from "./components/post/post_list_filter"
import EditPost from "./components/post/edit_post"
import EditComment from "./components/post/comment/edit_comment"

//novel
import Novel from "./components/novel/novel"
import NovelList from "./components/novel/noveLlist"

//tag
import TagList from "./components/post/tag_list"

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
     *reset the current session
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
                  <Route exact path="/profiles/notes/:handle" component={PostListFilter}/>
                  <Route exact path="/tags" component={TagList}/>
                  <Route exact path="/notes" component={PostList}/>
                  <Route exact path="/notes/:id" component={Post}/>
                  <Route exact path="/notes/tag/:tag" component={PostListFilter}/>
                  <Route exact path="/novels" component={NovelList}/>
                  <Route exact path="/novels/:id" component={Novel}/>
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