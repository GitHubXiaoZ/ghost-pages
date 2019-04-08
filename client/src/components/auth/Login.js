/*imports*/
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { loginUser } from "../../actions/authActions"

/* Class: Login
 * Login form
 * Logs in users using their email and password
 */
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errors: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuth) {
            this.props.history.push("/dashboard")
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
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
            <div className="">
                <div className="">
                    <div className="">
                        <Link to="/" className="">
                            Home
                        </Link>
                        <div>
                            <h4>
                                Log in
                            </h4>
                            <p className="">
                                Don't have an account? <Link to="/register">Register here</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={{invalid: errors.email || errors.emailnotfound}}
                                    />
                                    <label htmlFor="email">Email</label>
                                    <span className="">
                                        {errors.email}
                                        {errors.emailnotfound}
                                    </span>
                            </div>
                            <div className="">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={{invalid: errors.password || errors.passwordincorrect}}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <span className="">
                                        {errors.password}
                                        {errors.passwordincorrect}
                                    </span>
                            </div>
                            <div className="">
                                <button
                                    type="submit"
                                    className=""
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    errors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

/*exports login*/
export default connect(
    mapStateToProps,
    { loginUser }
) (Login)