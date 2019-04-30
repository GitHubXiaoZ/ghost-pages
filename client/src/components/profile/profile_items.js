/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import isEmpty from "is-empty"

/* Class: ProfileItems
 * ProfileItem tag
 * Display user name, status, location in profile list
 */
class ProfileItems extends Component {
    render() {
        const { profile } = this.props
        
        return (
            <div className="profile-list">
                <div className="profile">
                    <h3>{profile.user.name}</h3>
                    <p>{profile.status}</p>
                    <p>{isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
                    <Link to={`profile/${profile.handle}`}>View</Link>
                </div>
            </div>
        )
    }
}

ProfileItems.propTypes = {
    profile: PropTypes.object.isRequired
}

/*export profileitems*/
export default ProfileItems