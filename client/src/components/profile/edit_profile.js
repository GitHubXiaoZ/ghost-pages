/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { newProfile, getCurrentProfile } from "../../actions/profileActions"
import isEmpty from "is-empty"

/* Class: EditProfile
 * Profile form
 * edits the profile of a existing user
 */
class EditProfile extends Component {
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

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile

            profile.location = !isEmpty(profile.location) ? profile.location : ""
            profile.bio = !isEmpty(profile.bio) ? profile.bio : ""

            this.setState({
                handle: profile.handle,
                location: profile.location,
                bio: profile.bio
            })
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
            bio: this.state.bio
        }

        this.props.newProfile(profileData, this.props.history)
    }

    render() {
        const { errors } = this.state

        return (
            <div className="profile-form">
                <div className="form">
                    <Link to="/dashboard">Back</Link>
                    <h1>Edit Profile</h1>
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
                                <span className="locationError">
                                    {errors.location}
                                </span>
                        </div>
                        <div className="bio">
                            Profile Bio
                            <br/>
                            <textarea cols="25"
                                placeholder="About yourself!"
                                name="bio"
                                type="text"
                                onChange={this.onChange}
                                value={this.state.bio}
                                error={errors.bio}
                                />
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

EditProfile.propTypes = {
    newProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

/*export editprofile*/
export default connect(
    mapStateToProps,
    { newProfile,
      getCurrentProfile }
) (withRouter(EditProfile))