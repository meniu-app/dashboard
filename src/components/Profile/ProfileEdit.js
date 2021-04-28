import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import { getUser, setUser } from '../../api/TokenHandler';

class ProfileEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  componentDidMount() {
    const user = getUser();
    if (user) {
      this.setState({email: user.email})
    }
  }

  changeProfile = async (e) => {
    const { appActions, refreshUserEmail } = this.props;
    e.preventDefault();
    const user = getUser();
    const response = await appActions.editUserData({email: this.state.email}, user.id);
    if (response.type === 'EDIT_USER_DATA_SUCCESS') {
      const user = getUser();
      user.email = this.state.email;
      setUser(user);
      refreshUserEmail(user.email);
    }
  }

  render() {
    return (
      <form onSubmit={this.changeProfile} method="POST" className="mb-5" style={{'width': '300px'}}>
        <div className="mb-3">
            <label htmlFor="profileEmail" className="form-label">New Email</label>
            <input type="text" name="email" className="form-control" value={this.state.email} onChange={e => this.setState({email: e.target.value})} required id="profileEmail"></input>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-success">Submit</button>
        </div>
      </form>
    );
  }
}

ProfileEdit.propTypes = {
  appActions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object,
  refreshUserEmail: PropTypes.func
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.app.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileEdit));
