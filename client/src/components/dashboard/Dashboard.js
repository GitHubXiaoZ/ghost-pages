/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions"
import ProfilePreference from "./ProfilePreference"

/* Class: Dashboard
 * Dashboard component
 * Account page displays current user's profile activities
 * Activities include edit user's profile, logout session, and delete account
 */
class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
    }

    onDeleteClick = e => {
        this.props.deleteAccount()
    }

    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        let dashboardFeed

        if (profile === null || loading) {
            dashboardFeed = <Loading/>
        } else {
            if (Object.keys(profile).length > 0) {
                dashboardFeed = (
                <div>
                    <h3>Welcome back, <Link to={`/profile/${profile.handle}`}>{user.name}</Link>!</h3>
                    <ProfilePreference />
                    <button onClick={this.onDeleteClick.bind(this)}>
                        Delete Account
                    </button>
                </div>
                )
            } else {
                dashboardFeed = (
                    <div>
                        <p>Hello, {user.name}</p>
                        <p>Set up your profile <Link to="/new_profile">here!</Link></p>
                    </div>
                )
            }
        }

        return(
            <div className="dashboard">
                <div className="">
                    <div className="">
                        <h1>Dashboard</h1>
                        {dashboardFeed}
                    </div>
                </div>
            </div>
        )
    }
}

//dashboard proptypes
Dashboard.propTypes = {
    //{function} returns the current user's profile
    getCurrentProfile: PropTypes.func.isRequired,
    //{function} deletes current user's account from database
    deleteAccount: PropTypes.func.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired,
    //{object} profile component prop
    profile: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

/*export dashboard*/
export default connect(
    mapStateToProps,
    { getCurrentProfile,
      deleteAccount }
) (Dashboard)