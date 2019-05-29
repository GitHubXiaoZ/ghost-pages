/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import PostItem from "./post_item"
import { getPost } from "../../actions/postActions"

import CommentForm from "./comment/comment_form"
import CommentFeed from "./comment/comment_feed"

/* Class: Post
 * Post component
 * Displays a single post from post feed
 */
class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }

    render() {
        const { post, loading } = this.props.post
        let postThread

        if (post === null || loading || Object.keys(post).length === 0) {
            postThread = <h3>transmitting</h3>
        } else {
            postThread =(
                <div>
                    <PostItem post={post} displayActions={false}/>
                    <CommentForm post_id={post._id}/>
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

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

/*export post*/
export default connect(
    mapStateToProps,
    { getPost }
) (Post)