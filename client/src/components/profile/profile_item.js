/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import isEmpty from "is-empty"

/* Class: ProfileItem
 * Single Profile
 * Profile contains username, status, and location
 */
class ProfileItem extends Component {
    render() {
        const { profile } = this.props
        
        return (
            <div className="profile-list">
                <div className="profile">
                    <h3>{profile.user.name}</h3>
                    <p>{isEmpty(profile.location) ? null : (<span> @{profile.location}</span>)}</p>
                    <Link to={`profile/${profile.handle}`}>View</Link>
                </div>
            </div>
        )
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

/*export profileitem*/
export default ProfileItem