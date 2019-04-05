/*imports*/
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

const initialState = {}

const middleware = [thunk]

/*redux store*/
const store = createStore (
    () => [],
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

/*export store*/
export default store