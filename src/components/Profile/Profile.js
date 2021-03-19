import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../api/TokenHandler';

class Profile extends Component {
  render() {
    const user = getUser();
  
    return (
      <div className="container">
          <h3 className="my-3">Settings</h3>
          <div className="ms-4">
            <div className="d-flex mb-3">
              <h5>Account info</h5>
              <Link to="/settings/edit" className="ms-5">Edit</Link>
            </div>
            <h6><b>Name</b></h6>
            <p>{user.first_name} {user.last_name}</p>
            <h6><b>Address</b></h6>
            <p>100 Main Stree</p>
            <div className="d-flex">
              <h5>Password</h5>
              <Link to="/settings/change_password" className="ms-5">Edit</Link>
            </div>
            <h6><b>*************</b></h6>
          </div>
      </div>
    );
  }
}

export default Profile;
