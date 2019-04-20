/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { logoutUser } from "../../actions/authActions"

/* Class: Dashboard
 * User account page
 * Contains functions such as logout
 */
class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    render() {
        const { user } = this.props.auth

        return(
            <div className="">
                <div className="">
                    <div className="">
                        <h1>
                            Hello, {user.name}
                        </h1>
                        <button
                         onClick={this.onLogoutClick}
                         className="">
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired
} 

const mapStateToProps = state => ({
    auth: state.auth
})

/*exports dashboard*/
export default connect(
    mapStateToProps,
    { logoutUser }
) (Dashboard)