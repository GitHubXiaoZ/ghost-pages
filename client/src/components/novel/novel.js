/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import NovelItem from "./novel_item"
import { getNovel } from "../../actions/novelActions"

/* Class: Novel
 * Novel component
 * Displays a single novel from novel library
 */
class Novel extends Component {
    componentDidMount() {
        this.props.getNovel(this.props.match.params.id)
    }

    render() {
        const { novel, loading } = this.props.novel
        let library

        if (novel === null || loading || Object.keys(novel).length === 0) {
            library = <Loading/>
        } else {
            library =(
                <div>
                    <NovelItem novel={novel}/>
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

Novel.propTypes = {
    getNovel: PropTypes.func.isRequired,
    novel: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    novel: state.novel,
    auth: state.auth
})

/*export post*/
export default connect(
    mapStateToProps,
    { getNovel }
) (Novel)