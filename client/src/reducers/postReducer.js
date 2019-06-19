/*imports*/
import {
    ADD_POST,
    GET_POST,
    GET_POST_LIST,
    POST_LOADING,
    DELETE_POST
} from "../actions/types"

/*inital state*/
const initialState = {
    post: {},
    post_list: [],
    loading: false
}

/*exports post reducer*/
export default function(state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }
        case GET_POST_LIST:
            return {
                ...state,
                post_list: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                post_list: [action.payload, ...state.post_list]
            }
        case DELETE_POST:
            return {
                ...state,
                post_list: state.post_list.filter(post => post._id !== action.payload)
            }
        default: 
            return state 
    }
}
