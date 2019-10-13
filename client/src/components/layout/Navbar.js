/*imports*/
import React, { Component } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import { resetCurrentProfile } from "../../actions/profileActions"

/* Class: Navbar
 * Navigation bar
 * Display guest and user options for navigation
 */
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
                        <Link to="/notes">
                        Notebook
                        </Link>
                    </li>
                    <li>
                        <Link to="/tags">
                        Tags
                        </Link>
                    </li>
                    <li>
                        <Link to="/novels">
                        Novels
                        </Link>
                    </li>
                    <li>
                        <button onClick={this.onLogoutClick.bind(this)}>
                        Log out
                        </button>
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
                    <span className="notes">
                        <Link to="/notes">
                        PAGES
                        </Link>
                    </span>
                    { isAuth ? userLinks : guestLinks }
                </nav>
            </div>
        )
    }
}

/* navbar proptypes
 * logoutuser
 * auth
 */

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

/*exports navbar*/
export default connect(
    mapStateToProps,
    { logoutUser,
    resetCurrentProfile }   
) (Navbar)