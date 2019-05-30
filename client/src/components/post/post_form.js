/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { addPost } from "../../actions/postActions"

/* Class: PostForm
 * Post field form
 * Post contains a text field for user to submit stories
 */
class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            errors: {}
        }
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const { user } = this.props.auth

        const newPost = {
            text: this.state.text,
            name: user.name
        }

        this.props.addPost(newPost)
        this.setState({ text: "" })
    }
    
    render() {
        const { errors } = this.state

        return(
            <div className="post-form">
                <div className="form-body">
                    <form noValidate onSubmit={this.onSubmit}>
                        <textarea rows="5" cols="25"
                            placeholder="..."
                            name="text"
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.text}
                            error={errors.text}                       
                            />
                        <span className="postError">
                            {errors.text}
                        </span>
                        <br/>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

/*export postform*/
export default connect(
    mapStateToProps,
    { addPost }
) (PostForm)