/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { newProfile } from "../../actions/profileActions"

/* Class: NewProfile
 * Profile field form
 * Create a new profile using user data
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
                            Profile Handle
                            <br/>
                            <input
                                placeholder="Handle"
                                name="handle"
                                type="text"
                                onChange={this.onChange}
                                value={this.state.handle}
                                error={errors.handle}
                                />
                                <span className="handleError">
                                    {errors.handle}
                                </span>
                        </div>
                        <div className="location">
                            Location
                            <br/>
                            <input
                                placeholder="Location"
                                name="location"
                                type="text"
                                onChange={this.onChange}
                                value={this.state.location}
                                error={errors.location}
                                />
                                <label>Location</label>
                                <span className="locationError">
                                    {errors.location}
                                </span>
                        </div>
                        <div className="bio">
                            Profile Bio
                            <br/>
                            <input
                                placeholder="About yourself!"
                                name="bio"
                                type="text"
                                onChange={this.onChange}
                                value={this.state.bio}
                                error={errors.bio}
                                />
                                <label>About</label>
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

//newprofile proptypes
NewProfile.propTypes = {
    //{object} profile component prop
    profile: PropTypes.object.isRequired,
    //{object} errors component prop
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