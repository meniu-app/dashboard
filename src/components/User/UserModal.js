import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { getUserRole } from '../../api/TokenHandler';

class UserModal extends Component {

    async handleSubmit (event, props) {
        const { appActions, restaurantDetail } = props;
        const { role } = event.target;

        event.preventDefault();
        const data = new FormData(event.target);
        if (event.target.restaurantChecked?.checked || getUserRole() === 'owner')
            data.append('restaurant', restaurantDetail.id)

        const response = await appActions.addUserData(data, role.value)
        if (response) {
            event.target.email.value = '';
            event.target.password.value = '';
            document.getElementById('button-close-modal-user').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    render () {
        const { formLoading, restaurantDetail } = this.props;

        return (
            <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="userModalLabel">Add new user</h5>
                            <button id="button-close-modal-user" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} encType="multipart/form-data">
                                <div className="row mb-4">
                                    <div className="col-6 form-check ps-5">
                                        <p>
                                            <input className="form-check-input" type="radio" name="role" defaultValue="2" id="userRoleInput1" defaultChecked />
                                            <label className="form-check-label" htmlFor="userRoleInput1">
                                                Owner
                                            </label>
                                        </p>
                                        
                                    </div>
                                    <div className="col-6 form-check">
                                        <input className="form-check-input" type="radio" name="role" defaultValue="3" id="userRoleInput2" />
                                        <label className="form-check-label" htmlFor="userRoleInput2">
                                            Business Manager
                                        </label>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label htmlFor="userEmailInput">Email</label>
                                        <input name="email" type="email" className="form-control" id="userEmailInput" placeholder="user@email.com" required/>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="userPasswordInput">Password</label>
                                        <input name="password" type="password" className="form-control" id="userPasswordInput" placeholder="" required/>
                                    </div>
                                </div>

                                {
                                    getUserRole() === 'admin' && restaurantDetail.id &&
                                    <div className="row mb-4">
                                        <div className="form-check form-switch">
                                            <input name="restaurantChecked" className="form-check-input" type="checkbox" id="userRestaurantDefault" defaultChecked={true}/>
                                            <label className="form-check-label" htmlFor="userRestaurantDefault">Link user to {restaurantDetail.name}? </label>
                                        </div>
                                    </div>
                                    
                                }

                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-danger me-3" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-success">Submit</button>
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
