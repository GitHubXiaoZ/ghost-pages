/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import PostItem from "./post_item"
import { getPost } from "../../actions/postActions"

import CommentForm from "./comment/comment_form"
import CommentFeed from "./comment/comment_feed"

/* Class: Post
 * Post component
 * Link to text post
 */
class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }

    render() {
        const { post, loading } = this.props.post
        const { isAuth } = this.props.auth
        let postThread

        if (post === null || loading || Object.keys(post).length === 0) {
            //set loading icon
            postThread = <Loading/>
        } else {
            postThread =(
                <div>
                    <PostItem post={post} displayActions={false}/>
                    { isAuth ? <CommentForm post_id={post._id}/> : <Link to="/login">Sign in to comment</Link> }
                    <CommentFeed post_id={post._id} comments={post.comments}/>
                </div>
            )
        }

        return (
            <div className="post">
                <div className="thread">
                    <Link to="/dashboard">Return</Link>
                </div>
                {postThread}
            </div>
        )
    }
}


//post proptypes
Post.propTypes = {
    //{function} called to return a user post 
    getPost: PropTypes.func.isRequired,
    //{object} post component prop
    post: PropTypes.object.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

/*export post*/
export default connect(
    mapStateToProps,
    { getPost }
) (Post)