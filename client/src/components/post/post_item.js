/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import millsToDaysHoursMinutes from "../../utils/millsToDaysHoursMinutes"
import { likePost, unlikePost, deletePost } from "../../actions/postActions"

/* Class: PostItem
 * Single Post
 * Post contains username, content, like/dislike, delete function
 */
class PostItem extends Component {
    onDelete = id => {
        this.props.deletePost(id)
    }

    onLike = id => {
        this.props.likePost(id)
    }

    onUnlike = id => {
        this.props.unlikePost(id)
    }

    findLike = likes => {
        const { auth } = this.props

        return (likes.filter(like => like.user === auth.user.id ).length > 0)
    }

    render() {
        const { post, auth, displayActions } = this.props
        let timelapsed = Date.now() - Date.parse(post.date)

         return (
             <div className="post-user">
                <span>
                    {post.name} &#9830;&nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    }).format(Date.parse(post.date))} &#9830;&nbsp;
                    {millsToDaysHoursMinutes(timelapsed)}
                </span>
                <div className="post-content">
                    <p>{post.text}</p>
                    <div>
                        {post.user === auth.user.id ? (
                            <Link to={`/stories/edit/${post._id}`}>
                                Edit
                            </Link>
                        ): null}
                    </div>
                    <span>{post.likes.length} &#10084; </span>
                    {displayActions ? (
                        <span className="actions">
                            <button
                                onClick={this.onLike.bind(this, post._id)}
                                type="button"
                                className="like-button"
                                >
                                Like
                            </button>
                            <button
                                onClick={this.onUnlike.bind(this, post._id)}
                                type="button"
                                className="unlike-button"
                                >
                                Unlike
                            </button>
                            {post.comments.length}
                            <Link to={`/stories/${post._id}`}>
                                Comments
                            </Link>
                            {post.user === auth.user.id ? (
                                <button
                                    onClick={this.onDelete.bind(this, post._id)}
                                    type="button"
                                    className="delete-button"
                                    >
                                    Delete
                                </button>
                            ): null}
                        </span>
                    ): null}
                </div>
             </div>
         )
    }
}

PostItem.defaultProps = {
    displayActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

/*export postitem*/
export default connect(
    mapStateToProps,
    { likePost, 
      unlikePost,
      deletePost }
    ) (PostItem)