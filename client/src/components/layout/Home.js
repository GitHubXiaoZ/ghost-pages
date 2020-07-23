/*imports*/
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

/* Class: Home
 * Home component
 * GhostPage's home webpage 
 * Signed in users are redirected to user dashboard
 */
class Home extends Component {
  //redirect to dashboard
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="home">
        <div className="">
          <div className="">
            <h1>
              GHOST PAGES
            </h1>
            <p className="">
              Start your story here.
            </p>
            <br />
            <div className="register">
              <Link
                to="/register"
              >
                Register
              </Link>
            </div>
            <div className="login">
              <Link
                to="/login"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//home proptypes
Home.propTypes = {
  //{object} auth component prop
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

/*export home*/
export default connect(mapStateToProps) (Home)