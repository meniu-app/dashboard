import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

class UserModal extends Component {

    async handleSubmit (event, props) {
        const { appActions, restaurantDetail } = props;

        event.preventDefault();
        const data = new FormData(event.target)
        data.append('restaurant', restaurantDetail.id)
        const response = await appActions.addRestaurantData(data)
        if (response)
            document.getElementById('button-close-modal').click();
    }

    render () {
        const { formLoading } = this.props;

        return (
            <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="userModalLabel">Add new user</h5>
                            <button id="button-close-modal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} encType="multipart/form-data">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="role" defaultValue="Owner" id="userRoleInput1" defaultChecked />
                                        <label className="form-check-label" htmlFor="userRoleInput1">
                                            Owner
                                        </label>
                                    </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="role" defaultValue="Business Manager" id="userRoleInput2" />
                                    <label className="form-check-label" htmlFor="userRoleInput2">
                                        Business Manager
                                    </label>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="userEmailInput">User email</label>
                                    <input name="email" type="email" className="form-control" id="userEmailInput" placeholder="user@email.com" required/>
                                </div>
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                            : <Spinner />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UserModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    restaurantDetail: state.app.restaurantDetail,
    formLoading: state.app.formLoading
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserModal);
