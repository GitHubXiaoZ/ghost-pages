/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import CommentItem from "./comment_item"

/* Class: CommentFeed
 * Collection of comments
 * Render a commentitem for each comment in comment_list
 */
class CommentFeed extends Component {
    render() {
        const { comment_list, post_id } = this.props
        
        return comment_list.map(comment => <CommentItem key={comment._id} comment={comment} post_id={post_id}/>)
    }
}

CommentFeed.propTypes = {
    post_id: PropTypes.string.isRequired,
    comment: PropTypes.array.isRequired
}

/*export commentfeed*/
export default CommentFeed