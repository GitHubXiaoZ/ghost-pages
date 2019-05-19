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

        return (
            <div className="head">
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