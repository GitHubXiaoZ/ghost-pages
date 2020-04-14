/*imports*/
import React, { Component } from "react"
import isEmpty from "is-empty"

/* Class: ProfileHeader
 * Profile header component
 * Header of user profile contains user's status, location
 */
class ProfileHeader extends Component {
    render() {
        const { profile } = this.props
        const username = profile.user.name

        return (
            <div className="head">
                <h3>{username} ({profile.handle})</h3>
                <p>
                    EST&nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    }).format(Date.parse(profile.date))}
                </p>
                <p>
                    {isEmpty(profile.location) ? null : <span> @{profile.location}</span>}
                </p>
            </div>
        )
    }
}

/*export profileheader*/
export default ProfileHeader