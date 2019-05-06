/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

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

        return (likes.filter(like => like.user !== auth.user.id ).length > 0)
    }

    render() {
        const { post, auth, displayActions } = this.props

         return (
             <div className="post-user">
                <p>{post.name}</p>
                <br/>
                <div className="post-content">
                    <p>{post.text}</p>
                    {displayActions ? (
                        <span className="actions">
                            <span>{post.likes.length}</span>
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

export default connect(
    mapStateToProps,
    { likePost, 
      unlikePost,
      deletePost }
    ) (PostItem)