/*imports*/
import React from "react"
import { Link } from "react-router-dom"

/*options available for user's profile*/
const ProfilePreference = () => {
    return (
        <div>
            <Link to="/edit_profile">
            Edit Profile
            </Link>
        </div>
    )
}

/*export*/
export default ProfilePreference