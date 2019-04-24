import React, { Component } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import { resetCurrentProfile } from "../../actions/profileActions"

class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
        this.props.resetCurrentProfile()
    }

    render() {
        const { isAuth } = this.props.auth

        const userLinks = (
            <div>
                <ul>
                    <li>
                        <Link to="/dashboard">
                        Dashboard
                        </Link>
                    </li>
                    <li>
                        <p onClick={this.onLogoutClick.bind(this)}>
                        Log out
                        </p>
                    </li>
                </ul>
            </div>
        )

        const guestLinks = (
            <div>
                <ul>
                    <li>
                        <Link to="/register">
                        Register
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                        Log In
                        </Link>
                    </li>
                </ul>
            </div>
        )

        return (
            <div className="navbar">
                <nav className="bar">
                    <span className="Home">
                        <Link to="/">
                        GHOST
                        </Link>
                    </span>
                    { isAuth ? userLinks : guestLinks }
                </nav>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser,
    resetCurrentProfile }   
) (Navbar)