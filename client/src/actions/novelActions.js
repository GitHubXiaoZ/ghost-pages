/*imports*/
import axios from "axios"

import { 
    ADD_NOVEL,
    GET_NOVEL, 
    GET_NOVEL_LIST,
    DELETE_NOVEL,
    NOVEL_LOADING,
    GET_ERRORS } from "./types"

//add novel
export const addNovel = novelData => dispatch => {
    axios
        .post("/api/novels", novelData)
        .then(res => 
            dispatch({
                type: ADD_NOVEL,
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

//return novel by id
export const getNovel = id => dispatch => {
    dispatch(setNovelLoading())
    axios
        .get( `/api/novels/${id}`)
        .then(res =>
            dispatch({
                type: GET_NOVEL,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_NOVEL,
                payload: null
            })
        )
}

//return list of all novels
export const getNovelList = () => dispatch => {
    dispatch(setNovelLoading())
    axios
        .get("/api/novels")
        .then(res =>
            dispatch({
                type: GET_NOVEL_LIST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_NOVEL_LIST,
                payload: null
            })
        )
}

//delete novel by id
export const deleteNovel = id => dispatch => {
    axios
        .delete(`/api/novels/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_NOVEL,
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

//rate novel
export const rateNovel = id => dispatch => {
    axios
        .post(`/api/novels/rate/${id}`)
        .then(res => 
            dispatch(getNovelList())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//remove rating
export const unrateNovel = id => dispatch => {
    axios
        .post(`/api/posts/unrate/${id}`)
        .then(res => 
            dispatch(getNovelList())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//add comment to novel
export const addComment = (novel_id, commentData) => dispatch => {
    axios
        .post(`/api/novels/comment/${novel_id}`, commentData)
        .then(res => 
            dispatch({
                type: GET_NOVEL,
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

//loading
export const setNovelLoading = () => {
    return {
        type: NOVEL_LOADING
    }
}
