/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions"
import ProfilePreference from "./ProfilePreference"

/* Class: Dashboard
 * User account page
 * Contains functions such as logout
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
                    <h3>Welcome back, <Link to={`/profile/${profile.handle}`}>{ user.name }</Link>!</h3>
                    <ProfilePreference />
                    <button onClick={this.onDeleteClick.bind(this)}>
                        Delete Account
                    </button>
                </div>
                )
            } else {
                dashboardFeed = (
                    <div>
                        <p>Hello, { user.name }</p>
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

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

/*exports dashboard*/
export default connect(
    mapStateToProps,
    { getCurrentProfile,
      deleteAccount }
) (Dashboard)