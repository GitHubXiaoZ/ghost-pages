/*imports*/
import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import profileReducer from "./profileReducer"
import postReducer from "./postReducer"
import novelReducer from "./novelReducer"

/*export all reducers*/
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer,
    novel: novelReducer
})