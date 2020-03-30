/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import millsToDaysHoursMinutes from "../../utils/millsToDaysHoursMinutes"
import { rateNovel, unrateNovel, deleteNovel } from "../../actions/novelActions"

/* Class: NovelItem
 * Novel item component
 * Novel contains username, posted date, post content,
 * rate, unrate, and delete novel functions
 */
class NovelItem extends Component {
    onDelete = id => {
        this.props.deleteNovel(id)
    }

    onRate = id => {
        this.props.rateNovel(id)
    }

    onUnrate = id => {
        this.props.unrateNovel(id)
    }

    render() {
        const { novel, auth, displayActions } = this.props
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
                    {displayActions ? (
                        <span className="actions">
                            <button
                                onClick={this.onRate.bind(this, novel._id)}
                                type="button"
                                className="rate-button"
                                >
                                Rate
                            </button>
                            {novel.user === auth.user.id ? (
                                <button
                                    onClick={this.onDelete.bind(this, novel._id)}
                                    type="button"
                                    className="delete-button"
                                    >
                                    Delete
                                </button>
                            ): null}
                        </span>
                    ): null}
                </div>
             </div>
         )
    }
}


//defaultprops
NovelItem.defaultProps = {
    displayActions: true
}

//novelitem proptypes
NovelItem.propTypes = {
    //{object} novel component prop
    novel: PropTypes.object.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired,
    //{function} called to add a rating to a user novel on a scale of 1-5
    rateNovel: PropTypes.func.isRequired,
    //{function} called to remove user's rating from novel
    unrateNovel: PropTypes.func.isRequired,
    //{function} called to delete user's own novel
    deleteNovel: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

/*export novelitem*/
export default connect(
    mapStateToProps,
    { rateNovel,
      unrateNovel,
      deleteNovel }
    ) (NovelItem)