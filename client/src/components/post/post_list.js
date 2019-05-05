/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import PostForm from "./post_form"
import { getPostList } from "../../actions/postActions"

/* Class: Post
 * Post component
 * Displays post feed containing all posts
 */
class PostList extends Component {
    componentDidMount() {
        this.props.getPostList()
    }

    render() {
        const { post_list, loading } = this.props.post
        let postFeed

        if (post_list === null || loading) {
            postFeed = <h3>transmitting...</h3>
        } else {
            postFeed = (
                <div>
                    Posts
                </div>
            )
        }

        return(
            <div className="post">
                <div className="user-feed">
                    <Link to="/dashboard">Return</Link>
                </div>
                <PostForm/>
                {postFeed}
            </div>
        )
    }
}

PostList.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
}

const mapStateToProp = state => ({
    post: state.post
})

/*exports post*/
export default connect(
    mapStateToProp,
     { getPostList }
) (PostList)