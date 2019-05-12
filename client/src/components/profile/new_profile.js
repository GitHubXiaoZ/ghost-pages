/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { newProfile } from "../../actions/profileActions"

/* Class: NewProfile
 * Profile form
 * Creates a new profile for a user
 */
class NewProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            handle: "",
            status: "",
            location: "",
            bio: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const profileData = {
            handle: this.state.handle,
            status: this.state.status,
            location: this.state.location,
            bio: this.state.bio,
        }

        this.props.newProfile(profileData, this.props.history)
    }

    render() {
        const { errors } = this.state

        return (
            <div className="profile-form">
                <div className="form">
                    <h1>Create Profile</h1>
                    <form noValidate onSubmit={this.onSubmit}>
                                <div className="handle">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.handle}
                                        error={errors.handle}
                                        />
                                        <label htmlFor="handle">Handle</label>
                                        <span className="handleError">
                                            {errors.handle}
                                        </span>
                                </div>
                                <div className="status">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.status}
                                        error={errors.status}
                                        />
                                        <label htmlFor="status">Status</label>
                                        <span className="statusError">
                                            {errors.status}
                                        </span>
                                </div>
                                <div className="location">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.location}
                                        error={errors.location}
                                        />
                                        <label htmlFor="location">Location</label>
                                        <span className="locationError">
                                            {errors.location}
                                        </span>
                                </div>
                                <div className="bio">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.bio}
                                        error={errors.bio}
                                        />
                                        <label htmlFor="bio">Bio</label>
                                        <span className="bioError">
                                            {errors.bio}
                                        </span>
                                </div>
                                <div className="submit">
                                    <button
                                        type="submit"
                                    >
                                    Submit
                                    </button>
                                </div>
                     </form>
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

/*export newprofile*/
export default connect(
    mapStateToProps,
    { newProfile }
) (withRouter(NewProfile))