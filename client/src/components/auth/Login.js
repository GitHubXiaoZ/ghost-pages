/*imports*/
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { loginUser } from "../../actions/authActions"

/* Class: Login
 * Login form
 * Sign in to user's account
 * Redirect to user's dashboard
 */
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    //redirect to dashboard
    componentDidMount() {
        if (this.props.auth.isAuth) {
            this.props.history.push("/dashboard")
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuth) {
            this.props.history.push("/dashboard")
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData)
    }

    render() {
        const { errors } = this.state

        return (
            <div className="login">
                <div className="form">
                    <div className="home">
                        <Link to="/">
                            Home
                        </Link>
                        <div>
                            <h1> Log in </h1>
                            <p className="register">
                                Don't have an account? <Link to="/register">Register here.</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="email">
                                <input
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    />
                                    <span className="emailError">
                                        {errors.email}
                                        {errors.emailnotfound}
                                    </span>
                            </div>
                            <div className="password">
                                <input
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    />
                                    <span className="passwordError">
                                        {errors.password}
                                        {errors.passwordincorrect}
                                    </span>
                            </div>
                            <div className="submit">
                                <button
                                    type="submit"
                                >
                                Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

//login proptypes
Login.propTypes = {
    //{function} called to log in user
    loginUser: PropTypes.func.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired,
    //{object} errors component prop
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

/*export login*/
export default connect(
    mapStateToProps,
    { loginUser }
) (Login)