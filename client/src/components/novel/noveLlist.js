/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Loading from "../layout/Loading"
import NovelForm from "./novel_form"
import NovelLibrary from "./novel_library"
import { getNovelList } from "../../actions/novelActions"

/* Class: NovelList
 * Novel component
 * A list of all public novels
 */
class NovelList extends Component {
    componentDidMount() {
        this.props.getNovelList()
    }

    render() {
        const { novel_list, loading } = this.props.novel
        const { isAuth } = this.props.auth
        let library

        if (novel_list === null || loading) {
            //loading
            library = <Loading/>
        } else {
            //novel collection
            library = <NovelLibrary novel_list={novel_list}/>
        }

        return(
            <div className="novel">
                <div className="user-feed">
                    <Link to="/dashboard">Return</Link>
                </div>
                {isAuth ? <NovelForm/> : null}
                {library}
            </div>
        )
    }
}


//novellist proptypes
NovelList.propTypes = {
    //{object} novel component prop
    novel: PropTypes.object.isRequired,
    //{function} called to get a list of novels
    getNovelList: PropTypes.func.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    novel: state.novel,
    auth: state.auth
})

/*export novellist*/
export default connect(
    mapStateToProps,
     { getNovelList }
) (NovelList)