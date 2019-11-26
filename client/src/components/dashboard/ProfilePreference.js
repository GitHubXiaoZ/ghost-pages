/*imports*/
import React from "react"
import { Link } from "react-router-dom"

//edit user profile on user's dashboard page
const ProfilePreference = () => {
    return (
        <div>
            <Link to="/edit_profile">
                Edit Profile
            </Link>
        </div>
    )
}

/*export profilepreference*/
export default ProfilePreference