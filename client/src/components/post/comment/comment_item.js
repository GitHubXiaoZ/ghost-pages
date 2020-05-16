/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import millsToDaysHoursMinutes from "../../../utils/millsToDaysHoursMinutes"
import { deleteComment } from "../../../actions/postActions"

/* Class: CommentItem
 * Comment Item component
 * Comment contains username, comment date, comment text,
 * delete function
 */
class CommentItem extends Component {
    onDelete = (post_id, comment_id) => {
        this.props.deleteComment(post_id, comment_id)
    }

    render() {
        const { comment, auth, post_id } = this.props
        let timelapsed = Date.now() - Date.parse(comment.date)

        //comment template
         return (
             <div className="comment-user">
                <span>
                    <Link to={`/user/${comment.user}`}>
                        {comment.name} 
                    </Link>
                    &#9674;&nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    }).format(Date.parse(comment.date))} at&nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    }).format(Date.parse(comment.date))} &#9830;&nbsp;
                    {millsToDaysHoursMinutes(timelapsed)}
                </span>
                <div className="comment-content">
                    <p>{comment.text}</p>
                    <div>
                        {comment.update ? "*Edited on " +
                         new Intl.DateTimeFormat('en-US', {
                            year: "numeric",
                            month: "short",
                            day: "2-digit", 
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                         }).format(Date.parse(comment.update)
                         ): null}
                    </div>                    
                        {comment.user === auth.user.id ? (
                            <span className="actions">
                                <Link to={`/notes/edit/${post_id}/${comment._id}`}>
                                    Edit
                                </Link>
                                <button
                                    onClick={this.onDelete.bind(this, post_id, comment._id)}
                                    type="button"
                                    className="delete-button"
                                    >
                                    Delete
                                </button>
                            </span>
                        ): null}                   
                </div>
             </div>
         )
    }
}

//commentitem proptypes
CommentItem.propTypes = {
    //{string} post id component prop
    post_id: PropTypes.string.isRequired,
    //{object} comment component prop
    comment: PropTypes.object.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired,
    //{function} called to delete comment from post
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