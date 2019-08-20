/*imports*/
import { 
    ADD_NOVEL,
    GET_NOVEL, 
    NOVEL_LOADING } from "../actions/types"

/*inital state*/
const initialState = {
    novel: {},
    novel_list: [],
    loading: false
}

/*exports novel reducer*/
export default function(state = initialState, action) {
    switch (action.type) {
        case NOVEL_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_NOVEL:
            return {
                ...state,
                novel: action.payload,
                loading: false
            }
        case ADD_NOVEL:
            return {
                ...state,
                novel_list: [action.payload, ...state.novel_list]
            }
        default: 
            return state 
    }
}