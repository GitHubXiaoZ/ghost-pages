/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { editComment, getComment } from "../../../actions/postActions"

/* Class: EditComment
 * Comment field form
 * Comment form lets users edit previous comments
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

    onSubmit = e => {
        e.preventDefault()

        const { user } = this.props.auth
        const { post } = this.props.post

        const commentData = {
            text: this.state.text,
            name: user.name
        }

        this.props.editComment(post._id, commentData)
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

EditComment.propTypes = {
    editComment: PropTypes.func.isRequired,
    getComment: PropTypes.func.isRequired,
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
    { editComment,
      getComment }
) (EditComment)