/*imports*/
import axios from "axios"

import { 
    ADD_POST, 
    GET_POST,
    GET_POST_LIST, 
    GET_TAG_LIST,
    DELETE_POST,
    POST_LOADING,
    GET_ERRORS,
    RESET_ERRORS } from "./types"

//add a post to database
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

//edit user's post
export const editPost = (postData, id, history) => dispatch => {
    dispatch(resetErrors())
    axios
        .patch(`/api/posts/${id}`, postData)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            }),
            history.push(`/notes/${id}`)
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//return a post by id
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

//return all posts
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

//return all post uploaded by user id
export const getPostListByUser = user_id => dispatch => {
    dispatch(setPostLoading())
    axios
        .get(`/api/posts/user/${user_id}`)
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


//return all posts uploaded by user handle
export const getPostListByHandle = handle => dispatch => {
    dispatch(setPostLoading())
    axios
        .get(`/api/posts/users/${handle}`)
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

//return all posts with filtered tag
export const getPostListByTag = tag => dispatch => {
    dispatch(setPostLoading())
    axios
        .get(`/api/posts/tag/${tag}`)
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

//delete a post
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

//like a post
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

//remove like from a post
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

//add a comment to post
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

//edit user's comment
export const editComment = (post_id, comment_id, commentData, history) => dispatch => {
    dispatch(resetErrors())
    axios
        .patch(`/api/posts/comment/${post_id}/${comment_id}`, commentData)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            }),
            history.push(`/notes`)
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//return a comment by post id and comment id
export const getComment = (post_id, comment_id) => dispatch => {
    dispatch(setPostLoading())
    axios
        .get( `/api/posts/comment/${post_id}/${comment_id}`)
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

//delete a comment from post
export const deleteComment = (post_id, comment_id) => dispatch => {
    axios
        .delete(`/api/posts/comment/${post_id}/${comment_id}`)
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

//return all tags
export const getTagList = () => dispatch => {
    dispatch(setPostLoading())
    axios
        .get(`/api/posts/tags/all`)
        .then(res =>
            dispatch({
                type: GET_TAG_LIST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_TAG_LIST,
                payload: null
            })
        )
}

//post loading 
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

//resets errors
export const resetErrors = () => {
    return {
        type: RESET_ERRORS
    }
}