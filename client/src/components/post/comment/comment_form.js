/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { addComment } from "../../actions/postActions"

/* Class: CommentForm
 * Comment field form
 * Comment contains a text field for user to post on stories
 */
class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            errors: {}
        }
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const { user } = this.props.auth
        const { post_id } = this.props

        const newComment = {
            text: this.state.text,
            name: user.name
        }

        this.props.addComment(post_id, newComment)
        this.setState({ text: "" })
    }
    
    render() {
        const { errors } = this.state

        return(
            <div className="comment-form">
                <div className="form-header">PAGE</div>
                <div className="form-body">
                    <form noValidate onSubmit={this.onSubmit}>
                        <input
                            onChange={this.onChange}
                            value={this.state.text}
                            error={errors.text}
                            name="text"
                            type="text"                        
                            >
                        </input>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    post_id: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

/*export postform*/
export default connect(
    mapStateToProps,
    { addComment }
) (CommentForm)