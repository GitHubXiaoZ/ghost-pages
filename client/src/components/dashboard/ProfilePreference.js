/*imports*/
import React from "react"
import { Link } from "react-router-dom"

//display on user's dashboard 
//edit user profile data
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