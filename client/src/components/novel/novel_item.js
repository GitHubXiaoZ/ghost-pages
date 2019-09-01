/*imports*/
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import millsToDaysHoursMinutes from "../../utils/millsToDaysHoursMinutes"
import { rateNovel, unrateNovel, deleteNovel } from "../../actions/novelActions"

/* Class: NovelItem
 * Single novel
 * Novel contains username, content
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

NovelItem.defaultProps = {
    displayActions: true
}

NovelItem.propTypes = {
    novel: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    rateNovel: PropTypes.func.isRequired,
    unrateNovel: PropTypes.func.isRequired,
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