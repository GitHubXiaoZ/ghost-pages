/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import CommentItem from "./comment_item"

/* Class: CommentFeed
 * Array of comments
 * Render a commentitem for each comment in comment_list array
 */
class CommentFeed extends Component {
    render() {
        const { comments, post_id, novel_id } = this.props
        
        return comments.map(comment => <CommentItem key={comment._id} comment={comment} post_id={post_id} novel_id={novel_id}/>)
    }
}

//commentfeed proptypes
CommentFeed.propTypes = {
    //{string} post id component prop
    post_id: PropTypes.string.isRequired,
    //{string} novel component prop
    novel_id: PropTypes.string.isRequired,
    //{array} comments component prop
    comments: PropTypes.array.isRequired
}

/*export commentfeed*/
export default CommentFeed