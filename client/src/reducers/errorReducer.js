/*imports action*/
import { GET_ERRORS } from "../actions/types"

/*default*/
const initialState = {}

/*exports error reducer*/
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload
        default:
            return state 
    }
}