import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import { getUser } from '../../api/TokenHandler';

class ProfileChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
      diffPasswords: false
    }
  }

  changePassword = async (e) => {
    const { appActions } = this.props;
    e.preventDefault();
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({diffPasswords: true})
    } else {
      const user = getUser();
      const response = await appActions.editUserData({password: this.state.password}, user.id);
      if (response.type === 'EDIT_USER_DATA_SUCCESS') {
        this.setState({password: '', passwordConfirm: ''});
      }
    }
  }

  render() {
    return (
      <div className="container">
          <h3>Change password</h3>
          <form onSubmit={this.changePassword} className="form--login" method="POST">
                <div className="mb-3">
                    <label htmlFor="profileName" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={e => this.setState({password: e.target.value, diffPasswords: false})} id="changePassword" required></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="profileName" className="form-label">Confirm Password</label>
                    <input type="password" name="passwordConfirm" className="form-control" value={this.state.passwordConfirm} onChange={e => this.setState({passwordConfirm: e.target.value, diffPasswords: false})} id="changePasswordConfirm" required></input>
                    {this.state.diffPasswords ?
                      <p className="text-danger"><b>Passwords must be equal</b></p>:
                      <></>
                    }
                </div>
                <button className="btn btn-primary">Save</button>
            </form>
      </div>
    );
  }
}

ProfileChangePassword.propTypes = {
  appActions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object
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
)(withRouter(ProfileChangePassword));
