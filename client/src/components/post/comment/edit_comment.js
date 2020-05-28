/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { editComment, getComment } from "../../../actions/postActions"

/* Class: EditComment
 * Comment field form
 * Edit user's comment 
 */
class EditComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            errors: {}
        }
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getComment(this.props.match.params.id, this.props.match.params.comment_id)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors })
        }

        if (newProps.post.post) {
            const comment = newProps.post.post

            this.setState({
                text: comment.text
            })
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    //edit comment
    onSubmit = e => {
        e.preventDefault()

        const { post } = this.props.post

        const commentData = {
            text: this.state.text,
        }

        this.props.editComment(post.postID, post._id, commentData, this.props.history)
    }
    
    render() {
        const { errors } = this.state

        //comment form layout
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
                        <span>
                            {errors.text}
                        </span>
                        <br/>
                        <button type="submit">
                            Edit Comment
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

//editcomment proptypes
EditComment.propTypes = {
    //{function} called to edit the content of user's comment on post
    editComment: PropTypes.func.isRequired,
    //{function} called to return user's comment on post
    getComment: PropTypes.func.isRequired,
    //{object} post component prop
    post: PropTypes.object.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired,
    //{object} errors component prop
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
    { editComment,
      getComment }
) (EditComment)