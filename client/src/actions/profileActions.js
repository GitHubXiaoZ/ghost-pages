/*imports*/
import axios from "axios"

import { 
    GET_PROFILE, 
    GET_PROFILE_LIST, 
    PROFILE_LOADING, 
    SET_CURRENT_USER, 
    RESET_CURRENT_PROFILE, 
    GET_ERRORS } from "./types"

//create new profile
export const newProfile = (profileData, history) => dispatch => {
    axios
        .post("/api/profiles", profileData)
        //redirect to dashboard
        .then(res => history.push("/dashboard"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//return current user's profile
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

//return user handle's profile
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading())
    axios
        .get(`/api/profiles/handle/${handle}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        ).catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        )
}

//return profile of user id
export const getProfileByID = id => dispatch => {
    dispatch(setProfileLoading())
    axios
        .get(`/api/profiles/user/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        ).catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        )
}

//return list of all profiles
export const getProfileList = () => dispatch => {
    dispatch(setProfileLoading())
    axios
        .get("/api/profiles/all")
        .then(res =>
            dispatch({
                type: GET_PROFILE_LIST,
                payload: res.data
            })
        ).catch(err => 
            dispatch({
                type: GET_PROFILE_LIST,
                payload: null
            })
        )
}

//delete current user's profile
export const deleteAccount = () => dispatch => {
    axios
        .delete("/api/profiles")
        .then(res =>
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        ).catch(err=> 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//reset current user's profile
export const resetCurrentProfile = () => {
    return {
        type: RESET_CURRENT_PROFILE
    }
}

//loading 
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
