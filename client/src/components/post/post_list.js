/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import PostForm from "./post_form"
import PostFeed from "./post_feed"
import { getPostList } from "../../actions/postActions"

/* Class: PostList
 * Post component
 * Displays post feed containing all posts
 */
class PostList extends Component {
    componentDidMount() {
        this.props.getPostList()
    }

    render() {
        const { post, loading } = this.props.post
        let postFeed

        if (post === null || loading) {
            postFeed = <h3>transmitting...</h3>
        } else {
            postFeed = <PostFeed post_list={post}/>
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

/*exports postlist*/
export default connect(
    mapStateToProp,
     { getPostList }
) (PostList)