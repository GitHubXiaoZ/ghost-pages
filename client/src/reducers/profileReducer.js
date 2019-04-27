/*imports*/
import { 
    GET_PROFILE, 
    PROFILE_LOADING, 
    RESET_CURRENT_PROFILE 
} from "../actions/typesActions"

/*inital state*/
const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

/*exports profile reducer*/
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
        case RESET_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        default: 
            return state
    }
}