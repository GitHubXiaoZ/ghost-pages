/*imports*/
import axios from "axios"
import jwt_decode from "jwt-decode"
import setAuthToken from "../utils/setAuthToken"
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types"

//current user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//register user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        //redirect to login 
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//login user
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            //save jwt token to local storage
            const { token } = res.data
            localStorage.setItem("jwtToken", token)
            setAuthToken(token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//log out user
export const logoutUser = () => dispatch => {
    //reset
    localStorage.removeItem("jwtToken")
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}

//loading 
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}