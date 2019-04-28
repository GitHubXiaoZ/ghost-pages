/*imports*/
import axios from "axios"

import { GET_PROFILE, PROFILE_LOADING, SET_CURRENT_USER, RESET_CURRENT_PROFILE, GET_ERRORS } from "./typesActions"

/*create new profile*/
export const newProfile = (profileData, history) => dispatch => {
    axios
        .post("/api/profiles", profileData)
        .then(res => history.push("/dashboard"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

/*return current profile*/
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

/*delete profile action*/
export const deleteAccount = () => dispatch => {
    axios
        .delete("/api/profile")
        .then(res =>
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        ).catch(err=> 
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        )
}