/*imports*/
import axios from "axios"
import jwt_decode from "jwt-decode"
import setAuthToken from "../utils/setAuthToken"
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types"

//sets the logged user as current user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//user loading 
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

//registers user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//logs in user
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            //save jwt token to local storage
            const { token } = res.data
            //set token to local storage
            localStorage.setItem("jwtToken", token)
            //set token to auth header*/
            setAuthToken(token)
            //decode token-> get user data
            const decoded = jwt_decode(token)
            //set the current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//logs out user
export const logoutUser = () => dispatch => {
    //remove token from local storage
    localStorage.removeItem("jwtToken")
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}