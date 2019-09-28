/*imports actions*/
import { GET_ERRORS, RESET_ERRORS } from "../actions/types"

//default state
const initialState = {}

/*export error reducer*/
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