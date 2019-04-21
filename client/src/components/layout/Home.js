import React, { Component } from "react"
import { Link } from "react-router-dom"

class Landing extends Component {
  render() {
    return (
      <div className="home">
        <div className="">
          <div className="">
            <h1>
              Ghost Pages
            </h1>
            <p className="">
              Start your story here.
            </p>
            <br />
            <div className="register">
              <Link
                to="/register"
              >
                Register
              </Link>
            </div>
            <div className="login">
              <Link
                to="/login"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing