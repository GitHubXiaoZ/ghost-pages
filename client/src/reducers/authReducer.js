/*imports actions*/
import {
    SET_CURRENT_USER,
    USER_LOADING
} from "../actions/typesActions"

const isEmpty = require("is-empty")

/*default state*/
const initialState = {
    isAuth: false,
    user: {},
    loading: false
}

/*exports authentication user reducer*/
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuth: !isEmpty(action.payload),
                user: action.payload
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}