/*imports*/
import React, { Component } from "react"
import isEmpty from "is-empty"

/* Class: ProfileHeader
 * Profile header component
 * Header of user profile containing name, status, location, and socials
 */
class ProfileHeader extends Component {
    render() {
        const { profile } = this.props

        return (
            <div className="head">
                <h1>{profile.user.name}</h1>
                <p>{profile.status}</p>
                <p>
                    {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
                </p>
                <p>
                    {isEmpty(profile.social && profile.social.twitter) ? null : (
                        <a 
                            className="twitter"
                            href={profile.social.twitter}
                            >
                            Twitter
                        </a>
                    )}
                </p>
                <p>
                    {isEmpty(profile.social && profile.social.facebook) ? null : (
                        <a 
                            className="facebook"
                            href={profile.social.facebook}
                            >
                            Facebook
                        </a>
                    )}
                </p>
            </div>
        )
    }
}

/*exports profile header*/
export default ProfileHeader