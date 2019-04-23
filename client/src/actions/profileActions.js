/*imports*/
import axios from "axios"

import { GET_PROFILE, PROFILE_LOADING, RESET_CURRENT_PROFILE, GET_ERRORS } from "./typesActions"

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios
        .get("/api/profiles")
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        ).catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
}

/*profile loading action*/
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

/*profile reset action*/
export const resetCurrentProfile = () => {
    return {
        type: RESET_CURRENT_PROFILE
    }
}