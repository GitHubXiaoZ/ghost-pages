import React, { Component } from "react"
import { Link } from "react-router-dom"

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <nav className="bar">
                    <span className="Home">
                        <Link
                        to="/">
                        GHOST
                        </Link>
                    </span>
                    <span className="Register">
                        <Link
                        to="/register">
                        {' '}
                        Register
                        </Link>
                    </span>
                    <span className="Login">
                        <Link
                        to="/login">
                        {' '}
                        Log In
                        </Link>
                    </span>
                </nav>
            </div>
        )
    }
}

export default Navbar