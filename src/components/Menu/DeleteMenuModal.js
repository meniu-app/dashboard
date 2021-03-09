import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { withRouter } from 'react-router-dom';

class DeleteMenuModal extends Component {

    constructor(props) {
        super(props);
    }

    async handleSubmit (event, props) {
        const { appActions, menu } = props;
        event.preventDefault();
        const response = await appActions.deleteMenuData(menu.id, menu.restaurant);
        if (response){
            document.getElementById('button-close-modal-menu-delete').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    render () {
        const { formLoading, menu } = this.props;

        return (
            <div className="modal fade" id="deleteMenuModal" tabIndex="-1" aria-labelledby="deleteMenuModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteMenuModalLabel">Delete Menu</h5>
                            <button id="button-close-modal-menu-delete" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete <b>{menu.name}</b>? It will be permanently deleted.</p>
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

DeleteMenuModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired,
    menu: PropTypes.object.isRequired,
    menuDetailDataReady: PropTypes.bool
};

const mapStateToProps = (state) => ({
    restaurantDetail: state.app.restaurantDetail,
    formLoading: state.app.formLoading,
    menuDetailDataReady: state.app.menuDetailDataReady
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(DeleteMenuModal));