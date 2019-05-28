/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import CommentItem from "./comment_item"

/* Class: CommentFeed
 * Array of comments
 * Render a commentitem for each comment in comment_list
 */
class CommentFeed extends Component {
    render() {
        const { comments, post_id } = this.props
        
        return comments.map(comment => <CommentItem key={comment._id} comment={comment} post_id={post_id}/>)
    }
}

CommentFeed.propTypes = {
    post_id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
}

/*export commentfeed*/
export default CommentFeed