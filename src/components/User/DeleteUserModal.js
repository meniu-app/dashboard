import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

class DeleteUserModal extends Component {

    async handleSubmit (event, props) {
        const { appActions, restaurantDetail, user } = props;
        event.preventDefault();

        const response = await appActions.deleteUserData(user.id, restaurantDetail.id)
        if (response) {
            document.getElementById('button-close-modal-user-delete').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    render () {
        const { formLoading, user } = this.props;

        return (
            <div className="modal fade" id="deleteUserModal" tabIndex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteUserModalLabel">Delete User</h5>
                            <button id="button-close-modal-user-delete" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete <b>{user.email}</b>? The user will be permanently deleted.</p>
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} method="DELETE" encType="multipart/form-data">
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-danger">Delete</button>
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

DeleteUserModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
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
)(DeleteUserModal);
