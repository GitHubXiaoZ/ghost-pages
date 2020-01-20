/*import actions*/
import { 
    ADD_NOVEL,
    GET_NOVEL, 
    GET_NOVEL_LIST,
    DELETE_NOVEL,
    NOVEL_LOADING } from "../actions/types"

//inital state
const initialState = {
    novel: {},
    novel_list: [],
    loading: false
}

/*export novel reducer*/
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
        case GET_NOVEL_LIST:
            return {
                ...state,
                novel_list: action.payload,
                loading: false
            }
        case ADD_NOVEL:
            return {
                ...state,
                novel_list: [action.payload, ...state.novel_list]
            }
        case DELETE_NOVEL:
            return {
                ...state,
                novel_list: state.novel_list.filter(novel => novel._id !== action.payload)
            }
        default: 
            return state 
    }
}