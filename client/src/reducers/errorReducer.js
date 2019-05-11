/*imports action*/
import { GET_ERRORS, RESET_ERRORS } from "../actions/typesActions"

/*default*/
const initialState = {}

/*exports error reducer*/
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload
        case RESET_ERRORS:
            return {}
        default:
            return state 
    }
}