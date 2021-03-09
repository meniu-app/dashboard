import React, { Component } from "react";
import {Redirect, Route} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

class AuthenticatedRoute extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/"></Redirect>
    }
    return <Route {...this.props} />
  }
}

AuthenticatedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.element,
  history: PropTypes.object
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.app.isLoggedIn,
});

export default connect(mapStateToProps)(withRouter(AuthenticatedRoute));
