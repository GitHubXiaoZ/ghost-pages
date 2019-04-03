import React, { Component } from "react"
import { Link } from "react-router-dom"

class Landing extends Component {
  render() {
    return (
      <div className="">
        <div className="">
          <div className="">
            <h4>
              Welcome to Ghost Pages!
            </h4>
            <p className="">
              Start your story here.
            </p>
            <br />
            <div className="">
              <Link
                to="/register"
                className=""
              >
                Register
              </Link>
            </div>
            <div className="">
              <Link
                to="/login"
                className=""
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