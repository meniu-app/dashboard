import React, { Component } from 'react';
// import { track } from '../mixpanel';

class Sidenav extends Component {
    render() {
        return (
            <nav id="main-sidebar">
                <div className="row">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mainModal">
                        Add
                    </button>
                </div>
            </nav>
        );
    }
}

export default Sidenav;
