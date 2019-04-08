/*imports*/
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

const initialState = {}

const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/*redux store*/
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
    )
)

/*export store*/
export default store