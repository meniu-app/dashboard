import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <div className="container">
          <h3>Edit Profile</h3>
          <form onSubmit={this.loginSubmit} className="form--login" action="http://auth/login" method="POST">
                <div className="mb-3">
                    <label htmlFor="profileName" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" id="profileName" defaultValue="David Hincapie"></input>
                </div>
                <button className="btn btn-primary">Save</button>
            </form>
      </div>
    );
  }
}

export default Profile;
