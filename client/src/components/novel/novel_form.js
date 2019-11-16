/*imports*/
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { addNovel } from "../../actions/novelActions"

/* Class: NovelForm
 * Novel field form
 * Form contains data fields for title, status, tags, 
 * and synopsis for user submitted novels
 */
class NovelForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            status: "",
            tags: "",
            synopsis: "",
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

        const newNovel = {
            title: this.state.title,
            status: this.state.status,
            tags: this.state.tags,
            synopsis: this.state.synopsis,
            name: user.name
        }

        this.props.addNovel(newNovel)
        this.setState({ 
            title: "",
            status: "",
            tags: "",
            synopsis: ""
        })
    }
    
    render() {
        const { errors } = this.state

        return(
            <div className="post-form">
                <div className="form-body">
                    <form noValidate onSubmit={this.onSubmit}>
                        <textarea rows="1" cols="20"
                            placeholder="Title"
                            name="title"
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.title}
                            error={errors.text}                       
                            />
                        <br/>
                        <textarea rows="1" cols="20"
                            placeholder="Pub. Status"
                            name="status"
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.status}
                            error={errors.text}                       
                            />
                        <br/>
                        <textarea
                            placeholder="Tags"
                            name="tags"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.tags}
                            error={errors.text}
                            />       
                        <br/>  
                        <textarea rows="5" cols="20"
                            placeholder="Synopsis"
                            name="synopsis"
                            type="text" 
                            onChange={this.onChange}
                            value={this.state.synopsis}
                            error={errors.text}                       
                            />               
                        <span className="postError">
                            {errors.text}
                        </span>
                        <br/>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

//novelform proptypes
NovelForm.propTypes = {
    //{function} called to add a novel to database
    addNovel: PropTypes.func.isRequired,
    //{object} auth component prop
    auth: PropTypes.object.isRequired,
    //{object} errors component prop
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

/*export novelform*/
export default connect(
    mapStateToProps,
    { addNovel }
) (NovelForm)