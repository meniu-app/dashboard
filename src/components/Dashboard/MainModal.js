import React, { Component } from 'react';
import { getUserRole } from '../../api/TokenHandler';
import PropTypes from 'prop-types';

class MainModal extends Component {
    render() {
        const { restaurantDataReady } = this.props;
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
                                { restaurantDataReady &&
                                <div className="col-12 d-flex py-2">
                                    <img src="https://via.placeholder.com/80C/O" alt=""/>
                                    <div className="mx-3">
                                        <button className="btn-sel btn btn-lg" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#itemModal">
                                            <span className="badge bg-light"><i className="fas fa-2x fa-hamburger"></i></span>
                                            Add an item to any category
                                        </button>
                                    </div>
                                </div>
                                }
                                { restaurantDataReady &&
                                <div className="col-12 d-flex py-2">
                                    <img src="https://via.placeholder.com/80C/O" alt=""/>
                                    <div className="mx-3">
                                        <button className="btn-sel btn btn-lg" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#categoryModal">
                                            <span className="badge bg-light"><i className="fas fa-2x fa-tasks"></i></span>
                                            Add a category to your menu
                                        </button>
                                    </div>
                                </div>
                                }
                                { restaurantDataReady &&
                                <div className="col-12 d-flex py-2">
                                    <img src="https://via.placeholder.com/80C/O" alt=""/>
                                    <div className="mx-3">
                                        <button className="btn-sel btn btn-lg" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#menuModal">
                                            <span className="badge bg-light"><i className="far fa-2x fa-file-alt"></i></span>
                                            Add a menu to your store
                                        </button>
                                    </div>
                                </div>
                                }
                                { (getUserRole() === 'admin' || (getUserRole() === 'owner' && restaurantDataReady)) &&
                                <div className="col-12 d-flex py-2">
                                    <div className="icon-modal">
                                        
                                    </div>
                                    <div className="mx-3">
                                        <button className="btn-sel btn btn-lg" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#userModal">
                                            <span className="badge bg-light"><i className="fas fa-2x fa-user-plus"></i></span>
                                            Add new store user
                                        </button>
                                    </div>
                                </div>
                                }
                                { (getUserRole() === 'admin' || (getUserRole() === 'owner' && !restaurantDataReady)) && 
                                <div className="col-12 d-flex py-2">
                                    <div className="mx-3">
                                        <button className="btn-sel btn btn-lg" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#restaurantModal">
                                            <span className="badge bg-light"><i className="fas fa-2x fa-utensils"></i></span>
                                            Add a new restaurant
                                        </button>
                                    </div>
                                </div>
                                }
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

MainModal.propTypes = {
    restaurantDataReady: PropTypes.bool.isRequired,
};

export default MainModal;
