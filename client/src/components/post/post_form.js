/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { addPost } from "../../actions/postActions"

/* Class: PostForm
 * Post field form
 * Form contains text data fields for text and tag for post submission
 */
class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            tags: "",
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
            tags: this.state.tags,
            name: user.name
        }

        this.props.addPost(newPost)
        this.setState({ 
            text: "",
            tags: ""
        })
    }
    
    render() {
        const { errors } = this.state

        return(
            <div className="post-form">
                <div className="form-body">
                    <form noValidate onSubmit={this.onSubmit}>
                        <textarea rows="5" cols="20"
                            placeholder="..."
                            name="text"
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.text}
                            error={errors.text}                       
                            />
                        <br/>
                        <textarea
                            placeholder="Tags"
                            name="tags"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.tags}
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

//postform proptypes
PostForm.propTypes = {
    //{function} called to add a post to database
    addPost: PropTypes.func.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired,
    //{object} errors component prop
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