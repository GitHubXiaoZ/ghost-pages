import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

class NewProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            handle: "",
            status: "",
            location: "",
            bio: "",
            twitter: "",
            facebook: "",
            errors: ""
        }
    }
    render() {
        return (
            <div className="Profile-form">
                <div className="">
                    
                </div>
            </div>
        )
    }
}

NewProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(
    mapStateToProps
) (NewProfile)