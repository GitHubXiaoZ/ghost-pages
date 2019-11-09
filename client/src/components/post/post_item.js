/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import millsToDaysHoursMinutes from "../../utils/millsToDaysHoursMinutes"
import { likePost, unlikePost, deletePost } from "../../actions/postActions"

/* Class: PostItem
 * Post Item component
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
                <h4>
                    <Link to={`/user/${post.user}`}>
                        {post.name}
                    </Link>
                </h4>
                <span>
                    Posted on&nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    }).format(Date.parse(post.date))} at&nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    }).format(Date.parse(post.date))} &#9830;&nbsp;
                    {millsToDaysHoursMinutes(timelapsed)}
                </span>
                <div className="post-content">
                    <p>{post.text}</p>
                    <p>{post.tags ? post.tags.map(tag => 
                        <Link to={`notes/tag/${tag}`}>#{tag} </Link>) : ""}
                    </p>
                    <div>
                        {post.user === auth.user.id ? (
                            <Link to={`/notes/edit/${post._id}`}>
                                Edit
                            </Link>
                        ): null}
                    </div>
                    <div>
                        {post.update ? "*Edited on " +
                         new Intl.DateTimeFormat('en-US', {
                            year: "numeric",
                            month: "short",
                            day: "2-digit", 
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                         }).format(Date.parse(post.update)
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
                            {post.comments.length}&nbsp;
                            <Link to={`/notes/${post._id}`}>
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


//defaultprops
PostItem.defaultProps = {
    displayActions: true
}


//postitem proptypes
PostItem.propTypes = {
    //{object} post component prop
    post: PropTypes.object.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired,
    //{function} called to add user's like to a post
    likePost: PropTypes.func.isRequired,
    //{function} called to remove user's like from a post 
    unlikePost: PropTypes.func.isRequired,
    //{function} called to delete and remove user post from database
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