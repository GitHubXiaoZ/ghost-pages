/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import PostFeed from "../post/post_feed"
import ProfileHeader from "./profile_header"
import ProfileContent from "./profile_content"
import { getProfileByHandle, getProfileByID } from "../../actions/profileActions"
import { getPostListByUser, getPostListByHandle } from "../../actions/postActions"

/* Class: Profile
 * Profile component
 * Displays the profile of the user's handle
 */
class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle)
            this.props.getPostListByHandle(this.props.match.params.handle)
        } else if (this.props.match.params.id) {
            this.props.getProfileByID(this.props.match.params.id)
            this.props.getPostListByUser(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push("/NotFound")
        }
    }

    render() {
        const { profile, loading } = this.props.profile
        const { post_list } = this.props.post
        let profileFeed 
        let postFeed

        if (profile === null || loading) {
            profileFeed = <Loading/>
            postFeed = <Loading/>
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
            postFeed = <PostFeed post_list={post_list}/>
        }

        return (
            <div className="content">
                {profileFeed}
                {postFeed}
            </div>
        )
    }
}

/* profile proptypes
 * profile
 * getprofilebyhandle
 * getprofilebyid
 * getpostlistbyuser
 * getpostlistbyhandle
 */
Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
    getProfileByID: PropTypes.func.isRequired,
    getPostListByUser: PropTypes.func.isRequired,
    getPostListByHandle: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    post: state.post
})

/*export profile*/
export default connect(
    mapStateToProps,
    { getProfileByHandle,
      getProfileByID,
      getPostListByUser,
      getPostListByHandle }
) (Profile)