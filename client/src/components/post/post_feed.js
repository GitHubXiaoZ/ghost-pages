/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import PostItem from "./post_item"

/* Class: PostFeed
 * Post Feed Component
 * Render a post item for each post in post_list array
 */
class PostFeed extends Component {
    render() {
        const { post_list } = this.props
        
        return post_list.map(post => <PostItem key={post._id} post={post}/>)
    }
}


//postfeed proptypes
PostFeed.propTypes = {
    //{array} post list component prop
    post_list: PropTypes.array.isRequired
}

/*export postfeed*/
export default PostFeed