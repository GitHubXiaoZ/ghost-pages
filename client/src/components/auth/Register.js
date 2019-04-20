/*imports*/
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { registerUser } from "../../actions/authActions"


/* Class: Register
 * Register form
 * Registers new users using their name, email, and password
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
        this.setState({ [e.target.id]: e.target.value })
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
                <div className="">
                    <div className="">
                        <Link to="/" className="">
                            Home
                        </Link>
                        <div className="">
                            <h1> Register </h1>
                            <p className="">
                            Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="">
                                <input 
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={{invalid: errors.name}}
                                    />
                                    <label htmlFor="name">Name</label>
                                    <span className=""> {errors.name} </span>
                            </div>
                            <div className="">
                                <input 
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={{invalid: errors.email}}
                                    />
                                    <label htmlFor="email">Email</label>
                                    <span className=""> {errors.email} </span>
                            </div>
                            <div className="">
                                <input 
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={{invalid: errors.password}}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <span className=""> {errors.password} </span>
                            </div>
                            <div className="">
                                <input 
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={{invalid: errors.password2}}
                                    />
                                    <label htmlFor="password2">Confirm Password</label>
                                    <span className=""> {errors.password2} </span>
                            </div>
                            <div className="">
                                <button
                                    type="submit"
                                    className=""
                                >
                                Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

/*exports register */
export default connect(
    mapStateToProps,
    { registerUser }
) (withRouter(Register))