/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { addComment } from "../../../actions/postActions"

/* Class: CommentForm
 * Comment field form
 * Comment contains a text field for user to post on stories
 */
class CommentForm extends Component {
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
        const { post_id } = this.props

        const newComment = {
            text: this.state.text,
            name: user.name
        }

        this.props.addComment(post_id, newComment)
        this.setState({ text: "" })
    }
    
    render() {
        const { errors } = this.state

        return(
            <div className="comment-form">
                <div className="form-header">Comments</div>
                <div className="form-body">
                    <form noValidate onSubmit={this.onSubmit}>
                        <textarea rows="2" cols="25"
                            placeholder="..."
                            name="text"
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.text}
                            error={errors.text}                       
                            />
                        <span>
                            {errors.text}
                        </span>
                        <br/>
                        <button type="submit">
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

//commentform proptypes
CommentForm.propTypes = {
    //{function} called to add comment to post
    addComment: PropTypes.func.isRequired,
    //{string} post id component prop
    post_id: PropTypes.string.isRequired,
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
    { addComment }
) (CommentForm)