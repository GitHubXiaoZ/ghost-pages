/*imports*/
import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import profileReducer from "./profileReducer"
import postReducer from "./postReducer"

/*export all reducers*/
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer
})