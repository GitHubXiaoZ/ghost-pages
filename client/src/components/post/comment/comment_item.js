/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { deleteComment } from "../../actions/postActions"

/* Class: CommentItem
 * Single comment
 * Comment contains username, text, delete function
 */
class CommentItem extends Component {
    onDelete = (post_id, comment_id) => {
        this.props.deleteComment(post_id, comment_id)
    }

    render() {
        const { comment, auth, post_id } = this.props

         return (
             <div className="comment-user">
                <p>{comment.name}</p>
                <br/>
                <div className="comment-content">
                    <p>{comment.text}</p>
                        <span className="actions">
                            {comment.user === auth.user.id ? (
                                <button
                                    onClick={this.onDelete.bind(this, post_id, comment._id)}
                                    type="button"
                                    className="delete-button"
                                    >
                                    Delete
                                </button>
                            ): null}
                        </span>
                </div>
             </div>
         )
    }
}


CommentItem.propTypes = {
    post_id: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

/*export commentitem*/
export default connect(
    mapStateToProps,
    { deleteComment }
    ) (CommentItem)