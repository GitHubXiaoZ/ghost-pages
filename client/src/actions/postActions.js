/*imports*/
import axios from "axios"

import { ADD_POST, GET_ERRORS } from "./typesActions"

/*add a post*/
export const addPost = postData => dispatch => {
    axios
        .post("/api/posts", postData)
        .then(res => 
            dispatch({
                type: ADD_POST,
                dispatch: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                dispatch: err.response.data
            })
        )
}