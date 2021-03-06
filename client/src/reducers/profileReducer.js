/*import actions*/
import { 
    GET_PROFILE, 
    GET_PROFILE_LIST,
    PROFILE_LOADING, 
    RESET_CURRENT_PROFILE 
} from "../actions/types"

//inital state
const initialState = {
    profile: null,
    profile_list: null,
    loading: false
}

/*export profile reducer*/
export default function(state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case GET_PROFILE_LIST:
            return {
                ...state,
                profile_list: action.payload,
                loading: false
            }
        case RESET_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        default: 
            return state
    }
}