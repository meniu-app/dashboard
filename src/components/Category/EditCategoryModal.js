import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { withRouter } from 'react-router-dom';

class EditCategoryModal extends Component {

    constructor(props) {
        super(props);
        this.handleChangeCategory = this.props.handleChangeCategory.bind(this);
    }

    async handleSubmit (event, props) {
        const { appActions, category } = props;
        event.preventDefault();
        const data = new FormData(event.target)
        const response = await appActions.editCategoryData(data, category.id);
        if (response) {
            document.getElementById('button-close-modal-category-edit').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    render () {
        const { formLoading, category, handleChangeCategory } = this.props;

        const newCategory = {...category};

        return (
            <div className="modal fade" id="editCategoryModal" tabIndex="-1" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editCategoryModalLabel">Edit category</h5>
                            <button id="button-close-modal-category-edit" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} method="PATCH" encType="multipart/form-data">
                                <div className="row mb-4">
                                    <div className="col">
                                        <input name="name" type="text" className="form-control" id="categoryNameInputEdit" value={newCategory.name} onChange={handleChangeCategory} placeholder="My category" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label htmlFor="categoryDescriptionInputEdit">Category description</label>
                                        <textarea name="description" className="form-control" id="categoryDescriptionInputEdit" value={newCategory.description} onChange={handleChangeCategory} rows="3" required></textarea>
                                    </div>
                                </div>
                                
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-danger me-3" data-bs-dismiss="modal"  data-bs-toggle="modal" data-bs-target="#deleteCategoryModal">Delete</button>
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

EditCategoryModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired,
    category: PropTypes.object.isRequired,
    handleChangeCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    restaurantDetail: state.app.restaurantDetail,
    formLoading: state.app.formLoading,
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(EditCategoryModal));