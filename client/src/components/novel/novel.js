/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import NovelItem from "./novel_item"
import { getNovel } from "../../actions/novelActions"

import CommentForm from "../post/comment/comment_form"
import CommentFeed from "../post/comment/comment_feed"

/* Class: Novel
 * Novel component
 * Display a novel
 */
class Novel extends Component {
    componentDidMount() {
        this.props.getNovel(this.props.match.params.id)
    }

    render() {
        const { novel, loading } = this.props.novel
        const { isAuth } = this.props.auth
        let library

        if (novel === null || loading || Object.keys(novel).length === 0) {
            library = <Loading/>
        } else {
            library =(
                <div>
                    <NovelItem novel={novel} displayActions={false}/>
                    { isAuth ? <CommentForm novel_id={novel._id}/> : <Link to="/login">Sign in to comment.</Link> }
                    <CommentFeed novel_id={novel._id} comments={novel.comments}/>
                </div>
            )
        }

        return (
            <div className="post">
                <div className="thread">
                    <Link to="/dashboard">Return</Link>
                </div>
                {library}
            </div>
        )
    }
}

//novel proptypes
Novel.propTypes = {
    //{function} called to return a novel with corresponding id
    getNovel: PropTypes.func.isRequired,
    //{object} novel component prop
    novel: PropTypes.object.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    novel: state.novel,
    auth: state.auth
})

/*export novel*/
export default connect(
    mapStateToProps,
    { getNovel }
) (Novel)