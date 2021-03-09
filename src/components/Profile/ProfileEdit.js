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
      firstName: '',
      lastName: ''
    }
  }

  componentDidMount() {
    const user = getUser();
    if (user) {
      this.setState({firstName: user.first_name, lastName: user.last_name})
    }
  }

  changeProfile = async (e) => {
    const { appActions, history } = this.props;
    e.preventDefault();
    const user = getUser();
    const response = await appActions.editUserData({first_name: this.state.firstName, last_name: this.state.lastName}, user.id);
    if (response.type === 'EDIT_USER_DATA_SUCCESS') {
      const user = getUser();
      user.first_name = this.state.firstName;
      user.last_name = this.state.lastName;
      setUser(user);
      history.push('/profile');
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Edit Profile</h3>
        <form onSubmit={this.changeProfile} className="form--login" method="POST">
              <div className="mb-3">
                  <label htmlFor="profilefirstName" className="form-label">First name</label>
                  <input type="text" name="firstName" className="form-control" value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})} required id="profilefirstName"></input>
              </div>
              <div className="mb-3">
                  <label htmlFor="profilelastName" className="form-label">last name</label>
                  <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})} required id="profilelastName"></input>
              </div>
              <button className="btn btn-primary">Save</button>
          </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
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
)(withRouter(ProfileEdit));
