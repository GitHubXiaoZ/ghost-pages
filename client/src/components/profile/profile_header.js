/*imports*/
import React, { Component } from "react"
import isEmpty from "is-empty"

/* Class: ProfileHeader
 * Profile header component
 * Header of user profile containing status and location
 */
class ProfileHeader extends Component {
    render() {
        const { profile } = this.props
        const username = profile.user.name

        return (
            <div className="head">
                <h3>{username} ({profile.handle})</h3>
                <p>
                    {profile.status}
                    {isEmpty(profile.location) ? null : <span> in {profile.location}</span>}
                </p>
            </div>
        )
    }
}

/*exports profile header*/
export default ProfileHeader