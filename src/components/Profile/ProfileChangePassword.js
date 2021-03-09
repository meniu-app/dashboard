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
      oldPassword: '',
      password: '',
      password2: '',
      diffPasswords: false
    }
  }

  changePassword = async (e) => {
    const { appActions, history } = this.props;
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      this.setState({diffPasswords: true})
    } else {
      const user = getUser();
      const response = await appActions.changePasswordData({
        old_password: this.state.oldPassword,
        password: this.state.password,
        password2: this.state.password2
      }, user.id);
      if (response.type === 'CHANGE_PASSWORD_SUCCESS') {
        this.setState({
          oldPassword: '',
          password: '',
          password2: '',
          diffPasswords: false
        })
        history.push('/profile');
      }
    }
  }

  render() {
    return (
      <div className="container">
          <h3>Change password</h3>
          <form onSubmit={this.changePassword} className="form--login" method="POST">
                <div className="mb-3">
                    <label htmlFor="changePasswordOld" className="form-label">Old Password</label>
                    <input type="password" name="password" className="form-control" value={this.state.oldPassword} onChange={e => this.setState({oldPassword: e.target.value})} id="changePasswordOld" required></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="changePassword" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={e => this.setState({password: e.target.value, diffPasswords: false})} id="changePassword" required></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="changePassword2" className="form-label">Confirm Password</label>
                    <input type="password" name="password2" className="form-control" value={this.state.password2} onChange={e => this.setState({password2: e.target.value, diffPasswords: false})} id="changePassword2" required></input>
                    {this.state.diffPasswords ?
                      <p className="text-danger"><b>Passwords must be equal</b></p>:
                      <></>
                    }
                </div>
                <button className="btn btn-primary">Submit</button>
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
