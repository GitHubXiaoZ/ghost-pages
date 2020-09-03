/*import*/
import axios from "axios"

/**function setAuthToken
 * @param token (jwt token)
 * authenticate user
 */
const setAuthToken = token => {
    if (token) {
        //set an authorize token to every request
        axios.defaults.headers.common["Authorization"] = token
    } else {
        //delete auth header
        delete axios.defaults.headers.common["Authorization"] 
    }
}

export default setAuthToken