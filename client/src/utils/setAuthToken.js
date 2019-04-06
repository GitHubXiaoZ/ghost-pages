/*imports*/
import axios from "axios"

/*exports*/
export const setAuthToken = token => {
    if (token) {
        //sets an authorize token to every request
        axios.defaults.headers.common["Authorization"] = token
    } else {
        //deletes auth header
        delete axios.defaults.headers.common["Authorization"] 
    }
}
