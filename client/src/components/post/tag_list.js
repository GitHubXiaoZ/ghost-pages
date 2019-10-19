/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import { getTagList } from "../../actions/postActions"

/* Class: TagList
 * Tag component
 * Displays tag feed containing all tags
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

/* taglist proptype
 * gettaglist
 * taglist
 */
TagList.propTypes = {
    getTagList: PropTypes.func.isRequired,
    tag_list: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

/*exports taglist*/
export default connect(
    mapStateToProps,
     { getTagList }
) (TagList)