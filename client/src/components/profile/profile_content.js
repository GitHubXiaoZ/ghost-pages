/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import isEmpty from "is-empty"
import { Link } from "react-router-dom"

/* Class: ProfileContent
 * Profile content component
 * Content of user profile contains user's username, bio
 */
class ProfileContent extends Component {
    render() {
        const { profile } = this.props
        const username = profile.user.name

        return (
            <div className="content">
                <p>
                    {isEmpty(profile.bio) ? (
                        <span><i>{username} has a dark and mysterious past.</i></span>
                    ) : (
                        <span>{profile.bio}</span>
                    )}
                </p>
                <Link to={`/profiles/notes/${profile.handle}`}> {username}'s Post </Link>
            </div>
        )
    }
}

//profilecontent proptype
ProfileContent.propType = {
    //{object} profile component prop
    profile: PropTypes.object.isRequired
}

/*export profilecontent*/
export default ProfileContent