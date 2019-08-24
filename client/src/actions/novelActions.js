/*imports*/
import axios from "axios"

import { 
    ADD_NOVEL,
    GET_NOVEL, 
    GET_NOVEL_LIST,
    DELETE_NOVEL,
    NOVEL_LOADING,
    GET_ERRORS } from "./types"

/*add a novel*/
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

/*return a novel*/
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

/*return all novels*/
export const getPostList = () => dispatch => {
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



/*delete a novel*/
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

/*novel loading action*/
export const setNovelLoading = () => {
    return {
        type: NOVEL_LOADING
    }
}
