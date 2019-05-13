/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import isEmpty from "is-empty"

/* Class: ProfileContent
 * Profile body component
 * Content of user profile containing name and bio
 */
class ProfileContent extends Component {
    render() {
        const { profile } = this.props
        const username = profile.user.name

        return (
            <div className="content">
                <h2>{username}</h2>
                <p>
                    {isEmpty(profile.bio) ? (
                        <span><i>{username} has a dark and mysterious past.</i></span>
                    ) : (
                        <span>{profile.bio}</span>
                    )}
                </p>
            </div>
        )
    }
}

ProfileContent.propType = {
    profile: PropTypes.object.isRequired
}

/*exports profilecontent*/
export default ProfileContent