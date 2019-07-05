/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import PostForm from "./post_form"
import PostFeed from "./post_feed"
import { getPostListByUser, getPostListByHandle } from "../../actions/postActions"

/* Class: PostList
 * Post component
 * Displays post feed containing all posts
 */
class PostList extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getPostListByUser(this.props.match.params.id)
        } else if (this.props.match.params.handle) {
            this.props.getPostListByHandle(this.props.match.params.handle)
        } 
    }

    render() {
        const { post_list, loading } = this.props.post
        const { isAuth } = this.props.auth
        let postFeed

        if (post_list === null || loading) {
            postFeed = <Loading/>
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
    getPostListByUser: PropTypes.func.isRequired,
    getPostListByHandle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

/*exports postlist*/
export default connect(
    mapStateToProps,
     { getPostListByUser,
       getPostListByHandle }
) (PostList)