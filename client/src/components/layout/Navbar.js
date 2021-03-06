/*imports*/
import React, { Component } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import { resetCurrentProfile } from "../../actions/profileActions"

/* Class: Navbar
 * Navigation bar component
 * Display guest and user options for site navigation
 */
class Navbar extends Component {
    //log out
    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
        this.props.resetCurrentProfile()
    }

    render() {
        const { isAuth } = this.props.auth

        //user option
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
                        Log Out
                        </button>
                    </li>
                </ul>
            </div>
        )

        //guest option
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

//navbar proptypes 
Navbar.propTypes = {
    //{function} called to log out current user
    logoutUser: PropTypes.func.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

/*export navbar*/
export default connect(
    mapStateToProps,
    { logoutUser,
    resetCurrentProfile }   
) (Navbar)