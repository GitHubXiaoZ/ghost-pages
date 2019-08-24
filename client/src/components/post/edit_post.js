/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { editPost, getPost } from "../../actions/postActions"

/* Class: EditPost
 * Post field form
 * Post contains a text field for user to edit notes
 */
class EditPost extends Component {
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

    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors })
        }

        if (newProps.post.post) {
            const post = newProps.post.post

            this.setState({
                text: post.text,
                tags: post.tags
            })
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const { post } = this.props.post

        const postData = {
            text: this.state.text,
        }

        this.props.editPost(postData, post._id, this.props.history)
    }
    
    render() {
        const { errors } = this.state

        return(
            <div className="post-form">
                <Link to="/notes">Return</Link>
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
                        <span className="postError">
                            {errors.text}
                        </span>
                        <br/>
                        <button type="submit">
                            Edit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

EditPost.propTypes = {
    editPost: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    errors: state.errors
})

/*export editpost*/
export default connect(
    mapStateToProps,
    { editPost,
      getPost }
) (EditPost)