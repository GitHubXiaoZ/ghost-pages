/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import millsToDaysHoursMinutes from "../../utils/millsToDaysHoursMinutes"

/* Class: NovelItem
 * Single novel
 * Novel contains username, content
 */
class NovelItem extends Component {

    render() {
        const { novel } = this.props
        let timelapsed = Date.now() - Date.parse(novel.date)

         return (
             <div className="novel-user">
                 <h4>
                     {novel.title}
                 </h4>
                <h4>
                    <Link to={`/user/${novel.user}`}>
                        {novel.name}
                    </Link>
                </h4>
                <span>
                    Posted on&nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    }).format(Date.parse(novel.date))} at&nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    }).format(Date.parse(novel.date))} &#9830;&nbsp;
                    {millsToDaysHoursMinutes(timelapsed)}
                </span>
                <div className="novel-content">
                    <p>{novel.synopsis}</p>
                    <div>
                        {novel.update ? "*Edited on " +
                         new Intl.DateTimeFormat('en-US', {
                            year: "numeric",
                            month: "short",
                            day: "2-digit", 
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                         }).format(Date.parse(novel.update)
                         ): null}
                    </div>
                </div>
             </div>
         )
    }
}

NovelItem.defaultProps = {
    displayActions: true
}

NovelItem.propTypes = {
    novel: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

/*export novelitem*/
export default connect(
    mapStateToProps
    ) (NovelItem)