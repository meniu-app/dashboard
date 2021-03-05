import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../api/TokenHandler';

class Profile extends Component {
  render() {
    const user = getUser();
  
    return (
      <div className="container">
          <h3>This is my profile</h3>
          <h5>Name: {user.first_name} {user.last_name}</h5>
          <Link to="/profile/edit" className="btn btn-primary">Edit profile</Link>
          <br />
          <Link to="/profile/change_password" className="btn btn-primary mt-3">Change password</Link>
      </div>
    );
  }
}

export default Profile;
