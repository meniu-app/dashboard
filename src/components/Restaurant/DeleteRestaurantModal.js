import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

class DeleteRestaurantModal extends Component {

    async handleSubmit (event, props) {
        event.preventDefault();
        const { appActions } = props;

        const response = await appActions.deleteRestaurantData(props.restaurantDetail.id);
        if (response) {
            document.getElementById('button-close-modal-restaurant-delete').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
        
    }

    render () {
        const { formLoading, restaurantDetail } = this.props;

        return (
            <div className="modal fade" id="deleteRestaurantModal" tabIndex="-1" aria-labelledby="deleteRestaurantModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteRestaurantModalLabel">Delete Restaurant</h5>
                            <button id="button-close-modal-restaurant-delete" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete <b>{restaurantDetail.name}</b>? It will be permanently deleted.</p>
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} method="DELETE" encType="multipart/form-data">
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                                    <input type="submit" className="btn btn-danger" onClick={e => this.handleSubmit(e, this.props)} value="Delete" />
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

DeleteRestaurantModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    formLoading: PropTypes.bool.isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    handleChangeRestaurant: PropTypes.func
};

const mapStateToProps = (state) => ({
    menuDetail: state.app.menuDetail,
    menuDetailDataReady: state.app.menuDetailDataReady,
    formLoading: state.app.formLoading
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeleteRestaurantModal);
