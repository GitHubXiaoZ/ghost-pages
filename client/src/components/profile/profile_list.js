/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getProfileList } from "../../actions/profileActions"
import ProfileItem from "./profile_item"

/* Class: ProfileList
 * List of Profiles
 * Allows user to search through profiles
 */
class ProfileList extends Component {
    componentDidMount() {
        this.props.getProfileList()
    }

    render() {
        const { profiles, loading } = this.props.profile
        let profileItems

        if (profiles == null || loading) {
            profileItems = <h3>transmitting...</h3>
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile => (
                    <ProfileItem key={profile.id} profile={profile}/>
                ))
            } else {
                profileItems = <h3>No profiles found!</h3>
            }
        }
        return (
            <div className="profiles">
                <h1>
                    User Profiles
                </h1>
                <p>
                    Connect with another user.
                </p>
                {profileItems}
            </div>
        )
    }
}

ProfileList.propTypes = {
    getProfileList: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProp = state => ({
    profile: state.profile
})

/*export profilelist*/
export default connect(
    mapStateToProp,
    { getProfileList }
) (ProfileList)