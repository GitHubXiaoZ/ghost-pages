/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import NovelItem from "./novel_item"

/* Class: NovelLibrary
 * Array of novels
 * Render a novel item for each novel in novel_list array
 */
class NovelLibrary extends Component {
    render() {
        const { novel_list } = this.props
        
        return novel_list.map(novel => <NovelItem key={novel._id} novel={novel}/>)
    }
}

//novellibrary proptypes
NovelLibrary.propTypes = {
    //{array} novel list component prop
    novel_list: PropTypes.array.isRequired
}

/*export novellibrary*/
export default NovelLibrary