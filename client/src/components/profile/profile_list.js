/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import ProfileItem from "./profile_item"
import { getProfileList } from "../../actions/profileActions"

/* Class: ProfileList
 * Profile list component
 * List of all public user profile
 */
class ProfileList extends Component {
    componentDidMount() {
        this.props.getProfileList()
    }

    render() {
        const { profile_list, loading } = this.props.profile
        let profileItems

        if (profile_list === null || loading) {
            //set loading
            profileItems = <Loading/>
        } else {
            //profile collection
            if (profile_list.length > 0) {
                profileItems = profile_list.map(profile => (
                    <ProfileItem key={profile.id} profile={profile}/>
                ))
            } else {
                profileItems = <h3>No profiles found!</h3>
            }
        }
        return (
            <div className="profiles">
                <h1>
                    User Profiles
                </h1>
                <p>
                    Connect with another user.
                </p>
                {profileItems}
            </div>
        )
    }
}


//profilelist proptypes
//getprofilelist
//profile
ProfileList.propTypes = {
    getProfileList: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProp = state => ({
    profile: state.profile
})

/*export profilelist*/
export default connect(
    mapStateToProp,
    { getProfileList }
) (ProfileList)