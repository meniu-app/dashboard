import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <div className="container">
          <h3>This is my profile</h3>
          <h5>Name: David Hincapie</h5>
          <Link to="/profile/edit" className="btn btn-primary">Edit</Link>
      </div>
    );
  }
}

export default Profile;
