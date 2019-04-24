/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getCurrentProfile } from "../../actions/profileActions"

/* Class: Dashboard
 * User account page
 * Contains functions such as logout
 */
class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile()
    }

    render() {
        const { user } = this.props.auth

        return(
            <div className="">
                <div className="">
                    <div className="">
                        <h1>
                            Hello, {user.name}
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired
} 

const mapStateToProps = state => ({
    auth: state.auth
})

/*exports dashboard*/
export default connect(
    mapStateToProps,
    { getCurrentProfile }
) (Dashboard)