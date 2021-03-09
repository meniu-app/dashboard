import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { withRouter } from 'react-router-dom';

class DeleteCategoryModal extends Component {

    async handleSubmit (event, props) {
        const { appActions, category, restaurantDetail, menuDetail } = props;
        event.preventDefault();
        const response = await appActions.deleteCategoryData(category.id, restaurantDetail.id, menuDetail.id);
        if (response) {
            document.getElementById('button-close-modal-category-delete').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    render () {
        const { formLoading, category } = this.props;

        return (
            <div className="modal fade" id="deleteCategoryModal" tabIndex="-1" aria-labelledby="deleteCategoryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteCategoryModalLabel">Delete Category</h5>
                            <button id="button-close-modal-category-delete" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete <b>{category.name}</b>? It will be permanently deleted.</p>
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} method="DELETE" encType="multipart/form-data">
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Delete</button>
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

DeleteCategoryModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired,
    category: PropTypes.object.isRequired,
    menuDetail: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    restaurantDetail: state.app.restaurantDetail,
    formLoading: state.app.formLoading,
    menuDetail: state.app.menuDetail
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(DeleteCategoryModal));