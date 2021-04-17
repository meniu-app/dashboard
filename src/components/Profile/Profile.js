import React, { Component } from "react";
import { getUser } from "../../api/TokenHandler";
import ProfileEdit from './ProfileEdit'
import ProfileChangePassword from './ProfileChangePassword'

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showFormEmail: false,
      showFormPassword: false,
      email: getUser().email
    }
  }

  refreshUserEmail = (email) => {
    this.setState({email: email})
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h3 className="my-3">Profile</h3>
          <div className="col-12">
            <div className="ms-4">
              <div className="d-flex mb-3 align-items-end">
                <p className="form-label">Email</p>
                <button type="button" className="btn btn-link ms-5" onClick={() => this.setState({showFormEmail: !this.state.showFormEmail, showFormPassword: false})}>
                  {this.state.showFormEmail ? 'Editing' : 'Edit'}
                </button>
              </div>
              {this.state.showFormEmail &&
              <>
                <p>{this.state.email}</p>
                <ProfileEdit refreshUserEmail={this.refreshUserEmail}/>
              </>}
            </div>
          </div>
          <div className="col-12">
            <div className="ms-4">
              <div className="d-flex mb-3 align-items-end">
                <p className="form-label">Password</p>
                <button type="button" className="btn btn-link ms-5" onClick={() => this.setState({showFormPassword: !this.state.showFormPassword, showFormEmail: false})}>
                  {this.state.showFormPassword ? 'Editing' : 'Edit'}
                </button>
              </div>
              {this.state.showFormPassword && <ProfileChangePassword />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
