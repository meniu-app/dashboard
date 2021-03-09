import React, { Component } from 'react';

class Spinner extends Component {
  render() {
    return (
        <div className="text-center my-5">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
      </div>
    );
  }
}

export default Spinner;
