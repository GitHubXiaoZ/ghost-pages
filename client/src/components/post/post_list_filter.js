/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import PostFeed from "./post_feed"
import { getPostListByUser,
         getPostListByHandle, 
         getPostListByTag } from "../../actions/postActions"

/* Class: PostListFilter
 * Post list component
 * List of filtered posts
 * Posts are filtered through url params 
 */
class PostListFilter extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getPostListByUser(this.props.match.params.id)
        } else if (this.props.match.params.handle) {
            this.props.getPostListByHandle(this.props.match.params.handle)
        } else if (this.props.match.params.tag) {
            this.props.getPostListByTag(this.props.match.params.tag)
        }
    }

    render() {
        const { post_list, loading } = this.props.post
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
                {postFeed}
            </div>
        )
    }
}


//postlistfilter proptypes
PostListFilter.propTypes = {
    //{object} post component prop
    post: PropTypes.object.isRequired,
    //{function} called to return a list of user's posts based on id
    getPostListByUser: PropTypes.func.isRequired,
    //{function} called to return a list of user's posts based on user's handle
    getPostListByHandle: PropTypes.func.isRequired,
    //{function} called to return a list of posts based on tag
    getPostListByTag: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

/*export postlistfiltered*/
export default connect(
    mapStateToProps,
     { getPostListByUser,
       getPostListByHandle,
       getPostListByTag }
) (PostListFilter)