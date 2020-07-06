/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import PostForm from "./post_form"
import PostFeed from "./post_feed"
import { getPostList } from "../../actions/postActions"

/* Class: PostList
 * Post list component
 * List of all public posts
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
            //set loading icon
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


//postlist proptypes
PostList.propTypes = {
    //{object} post component prop
    post: PropTypes.object.isRequired,
    //{function} called to get a list of post
    getPostList: PropTypes.func.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

/*export postlist*/
export default connect(
    mapStateToProps,
     { getPostList }
) (PostList)