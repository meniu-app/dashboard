import React, { Component } from 'react';
// import { track } from '../mixpanel';

class MainModal extends Component {
    render() {
        return (
            <div className="modal fade" id="mainModal" tabIndex="-1" aria-labelledby="mainModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="mainModalLabel">Add</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 d-flex py-2">
                                <img src="https://via.placeholder.com/100C/O" alt=""/>
                                <div className="mx-3">
                                    <h4>Item</h4>
                                    <p>Add an item to any category</p>
                                </div>
                            </div>
                            <div className="col-12 d-flex py-2">
                                <img src="https://via.placeholder.com/100C/O" alt=""/>
                                <div className="mx-3">
                                    <h4>Item</h4>
                                    <p>Add an item to any category</p>
                                </div>
                            </div>
                            <div className="col-12 d-flex py-2">
                                <img src="https://via.placeholder.com/100C/O" alt=""/>
                                <div className="mx-3">
                                    <h4>Category</h4>
                                    <p>Add a category to your menu</p>
                                </div>
                            </div>
                            <div className="col-12 d-flex py-2">
                                <img src="https://via.placeholder.com/100C/O" alt=""/>
                                <div className="mx-3">
                                    <h4>menu</h4>
                                    <p>Add a menu to your store</p>
                                </div>
                            </div>
                            <div className="col-12 d-flex py-2">
                                <img src="https://via.placeholder.com/100C/O" alt=""/>
                                <div className="mx-3">
                                    <h4>New User</h4>
                                    <p>Add another user to your store</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainModal;
