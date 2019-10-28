/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import PostItem from "./post_item"

/* Class: PostFeed
 * Array of posts
 * Render a postitem for each post in post_list
 */
class PostFeed extends Component {
    render() {
        const { post_list } = this.props
        
        return post_list.map(post => <PostItem key={post._id} post={post}/>)
    }
}


//postfeed proptypes
//post_list
PostFeed.propTypes = {
    post_list: PropTypes.array.isRequired
}

/*export postfeed*/
export default PostFeed