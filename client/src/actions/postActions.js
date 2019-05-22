/*imports*/
import axios from "axios"

import { 
    ADD_POST, 
    GET_POST, 
    GET_POST_LIST, 
    POST_LOADING, 
    DELETE_POST,
    GET_ERRORS,
    RESET_ERRORS } from "./types"

/*add a post*/
export const addPost = postData => dispatch => {
    dispatch(resetErrors())
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
    dispatch(setPostLoading())
    axios
        .get( `/api/posts/${id}`)
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
    dispatch(setPostLoading())
    axios
        .get("/api/posts")
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

/*delete a post*/
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

/*like a post*/
export const likePost = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => 
            dispatch(getPostList())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

/*unlike a post*/
export const unlikePost = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => 
            dispatch(getPostList())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

/*add a comment to post*/
export const addComment = (post_id, commentData) => dispatch => {
    dispatch(resetErrors())
    axios
        .post(`/api/posts/comment/${post_id}`, commentData)
        .then(res => 
            dispatch({
                type: GET_POST,
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

/*add a comment to post*/
export const deleteComment = (post_id, comment_id) => dispatch => {
    axios
        .post(`/api/posts/comment/${post_id}/${comment_id}`)
        .then(res => 
            dispatch({
                type: GET_POST,
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

/*post loading action*/
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

/*resets errors before new action*/
export const resetErrors = () => {
    return {
        type: RESET_ERRORS
    }
}