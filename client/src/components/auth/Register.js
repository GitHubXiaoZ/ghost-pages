/*imports*/
import React, { Component } from "react"
import { Link } from "react-router-dom"

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
        
        console.log(newUser)
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
                        <div className="">
                            <h4> Register </h4>
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
                                    />
                                    <label htmlFor="name">Name</label>
                            </div>
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
                                    <label htmlFor="password">Password</label>
                            </div>
                            <div className="">
                                <input 
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    />
                                    <label htmlFor="password2">Confirm Password</label>
                            </div>
                            <div className="" style={{ paddingLeft: "11.250px" }}>
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

/*exports register */
export default Register