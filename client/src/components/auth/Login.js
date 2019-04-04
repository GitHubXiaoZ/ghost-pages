/*imports*/
import React, { Component } from "react"
import { Link } from "react-router-dom"

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

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(userData)
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
                                    />
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    />
                                    <label htmlFor="email">Password</label>
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

/*exports login*/
export default Login