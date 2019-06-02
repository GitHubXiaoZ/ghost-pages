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
        const { post_list, loading } = this.props.post
        const { isAuth } = this.props.auth
        let postFeed

        if (post_list === null || loading) {
            postFeed = <h3>transmitting...</h3>
        } else {
            postFeed = <PostFeed post_list={post_list}/>
        }

        return(
            <div className="post">
                <div className="user-feed">
                    <Link to="/dashboard">Return</Link>
                </div>
                {isAuth ? <PostForm/> : null}
                {postFeed}
            </div>
        )
    }
}

PostList.propTypes = {
    post: PropTypes.object.isRequired,
    getPostList: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

/*exports postlist*/
export default connect(
    mapStateToProps,
     { getPostList }
) (PostList)