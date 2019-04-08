/*imports*/
import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"

/*export all reducers*/
export default combineReducers({
    auth: authReducer,
    errors: errorReducer
})