/*imports*/
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { registerUser } from "../../actions/authActions"


/* Class: Register
 * Register form
 * Create new user account given user's username, email, and password
 * Redirects to dashboar after registration
 */
class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuth) {
            this.props.history.push("/dashboard")
        }
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        
        this.props.registerUser(newUser, this.props.history)
    }

    render() {
        const { errors } = this.state

        return (
            <div className="register">
                <div className="form">
                    <div className="home">
                        <Link to="/">
                            Home
                        </Link>
                        <div className="register">
                            <h1> Register </h1>
                            <p className="">
                            Already have an account? <Link to="/login">Log in.</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="name">
                                Username
                                <br/>
                                <input 
                                    placeholder="Username"
                                    name="name"
                                    type="name"
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    />
                                    <span className="nameError"> {errors.name} </span>
                            </div>
                            <div className="email">
                                Email Address
                                <br/>
                                <input 
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    />
                                    <span className="emailError"> {errors.email} </span>
                            </div>
                            <div className="password">
                                Password
                                <br/>
                                <input 
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    />
                                    <span className="passwordError"> {errors.password} </span>
                            </div>
                            <div className="confirm">
                                Confirm Password
                                <br/>
                                <input 
                                    placeholder="Confirm your password"
                                    name="password2"
                                    type="password"
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    />
                                    <span className="password2Error"> {errors.password2} </span>
                            </div>
                            <div className="submit">
                                <button
                                    type="submit"
                                >
                                Sign up!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

//register proptypes
Register.propTypes = {
    //{function} called to register new users
    registerUser: PropTypes.func.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired,
    //{object} errors component prop
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

/*export register*/
export default connect(
    mapStateToProps,
    { registerUser }
) (withRouter(Register))