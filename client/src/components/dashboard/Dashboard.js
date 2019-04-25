/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { getCurrentProfile } from "../../actions/profileActions"

/* Class: Dashboard
 * User account page
 * Contains functions such as logout
 */
class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
    }

    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        let dashboardFeed

        if (profile === null || loading) {
            dashboardFeed = <h3>transmitting...</h3>
        } else {
            if (Object.keys(profile).length > 0) {
                dashboardFeed = <h3>Welcome back, { user.name }!</h3>
            } else {
                dashboardFeed = (
                    <div>
                        <p>Hello, { user.name }</p>
                        <p>Set up your profile</p>
                        <Link to="/new_profile">here!</Link>
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
    auth: PropTypes.func.isRequired
} 

const mapStateToProps = state => ({
    auth: state.auth
})

/*exports dashboard*/
export default connect(
    mapStateToProps,
    { getCurrentProfile }
) (Dashboard)