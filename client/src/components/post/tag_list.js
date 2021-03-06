/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import { getTagList } from "../../actions/postActions"

/* Class: TagList
 * Tag component
 * List of all user generated tags
 */
class TagList extends Component {
    componentDidMount() {
        this.props.getTagList()
    }

    render() {
        const { tag_list, loading } = this.props.post
        let tagFeed

        if (tag_list === null || loading) {
            //loading
            tagFeed = <Loading/>
        } else {
            //link to tags
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

//taglist proptypes
TagList.propTypes = {
    //{function} called to return a list of post tags
    getTagList: PropTypes.func.isRequired,
    //{array} tag list component prop
    tag_list: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

/*export taglist*/
export default connect(
    mapStateToProps,
     { getTagList }
) (TagList)