/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import ProfileHeader from "./profile_header"
import ProfileContent from "./profile_content"
import { getProfileByHandle } from "../../actions/profileActions"
import { getProfileByID } from "../../actions/profileActions"

/* Class: Profile
 * Profile component
 * Displays the profile of the user's handle
 */
class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle)
        } else if (this.props.match.params.id) {
            this.props.getProfileByID(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push("/NotFound")
        }
    }

    render() {
        const { profile, loading } = this.props.profile
        let profileFeed 

        if (profile === null || loading) {
            profileFeed = <h3>transmitting...</h3>
        } else {
            profileFeed = (
                <div>
                    <div className="user-feed">
                        <Link to="/dashboard">Return</Link>
                    </div>
                    <div className="handle-feed">
                        <ProfileHeader profile={profile}/>
                        <ProfileContent profile={profile}/>
                    </div>
                </div>
            )
        }

        return (
            <div className="content">
                {profileFeed}
            </div>
        )
    }
}
Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
    getProfileByID: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

/*exports profile*/
export default connect(
    mapStateToProps,
    { getProfileByHandle,
    getProfileByID }
) (Profile)