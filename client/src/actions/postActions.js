/*imports*/
import axios from "axios"

import { ADD_POST, GET_POST, GET_POST_LIST, GET_ERRORS } from "./typesActions"

/*add a post*/
export const addPost = postData => dispatch => {
    axios
        .post("/api/posts", postData)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

/*return a post*/
export const getPost = id => dispatch => {
    axios
        .post( `/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        )
}

/*return all post*/
export const getPostList = () => dispatch => {
    axios
        .post( "/api/posts")
        .then(res =>
            dispatch({
                type: GET_POST_LIST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST_LIST,
                payload: null
            })
        )
}