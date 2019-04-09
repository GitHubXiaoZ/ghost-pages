/*imports*/
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

/* PrivateRoute
 * Authenticate user
 * If they are unable to be authenticated redirect to login page
 */
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuth === true ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

/*exports privateroute*/
export default connect(mapStateToProps)(PrivateRoute)