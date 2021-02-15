import React, { Component } from 'react';
import { track } from '../mixpanel';

class Footer extends Component {
  render() {
    return (
      <footer className="container text-center py-4">
        <div className="row mb-5">
          <h4 className="footer--title" onClick={() => track('Get to Know Us clicked', { event: 'Get to Know Us clicked' })}>Get to Know Us</h4>
          <p className="footer--link mb-1" onClick={() => track('About us clicked', { event: 'About us clicked' })}>About us</p>
          <p className="footer--link mb-1" onClick={() => track('Linkedin clicked', { event: 'Linkedin clicked' })}>Linkedin</p>
        </div>
        <div className="row mb-5">
          <div className="col-12">
            <i className="footer--social-icon mx-2 fab fa-facebook-square" onClick={() => track('Social Facebook clicked', { event: 'Social Facebook clicked' })}></i>
            <i className="footer--social-icon mx-2 fab fa-twitter" onClick={() => track('Social Twitter clicked', { event: 'Social Twitter clicked' })}></i>
            <i className="footer--social-icon mx-2 fab fa-instagram" onClick={() => track('Social Instagram clicked', { event: 'Social Instagram clicked' })}></i>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex flex-row justify-content-center">
            <p className="footer--link mx-2" onClick={() => track('Terms of Service clicked', { event: 'Terms of Service clicked' })}>Terms of Service</p>
            <p className="footer--link mx-2" onClick={() => track('Privacy clicked', { event: 'Privacy clicked' })}>Privacy</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
