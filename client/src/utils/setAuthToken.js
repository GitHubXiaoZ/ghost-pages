/*import*/
import axios from "axios"

/**
 * function setAuthToken
 * @param token (jwt token)
 * authenticates user using jwt token
 */
const setAuthToken = token => {
    if (token) {
        //sets an authorize token to every request
        axios.defaults.headers.common["Authorization"] = token
    } else {
        //deletes auth header
        delete axios.defaults.headers.common["Authorization"] 
    }
}

export default setAuthToken