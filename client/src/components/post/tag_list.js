/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import { getTagList } from "../../actions/postActions"

/* Class: PostList
 * Post component
 * Displays post feed containing all posts
 */
class TagList extends Component {
    componentDidMount() {
        this.props.getTagList()
    }

    render() {
        const { tag_list, loading } = this.props.post
        let tagFeed

        if (tag_list === null || loading) {
            tagFeed = <Loading/>
        } else {
            tagFeed = tag_list.map(tag => 
            <li>
                <Link to={`notes/tag/${tag}`}>{tag}</Link>
            </li>
            )
        }

        return(
            <div className="post">
                <div className="user-feed">
                    <Link to="/dashboard">Return</Link>
                </div>
                {tagFeed}
            </div>
        )
    }
}

TagList.propTypes = {
    getTagList: PropTypes.func.isRequired,
    tag_list: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

/*exports postlist*/
export default connect(
    mapStateToProps,
     { getTagList }
) (TagList)