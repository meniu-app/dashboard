import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { withRouter } from 'react-router-dom';

class MenuModal extends Component {

    async handleSubmit (event, props) {
        const { appActions, restaurantDetail } = props;

        event.preventDefault();
        const data = new FormData(event.target)
        data.append('restaurant', restaurantDetail.id)
        const response = await appActions.addMenuData(data)
        if (response){
            document.getElementById('button-close-modal-menu').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    render () {
        const { formLoading } = this.props;

        return (
            <div className="modal fade" id="menuModal" tabIndex="-1" aria-labelledby="menuModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="menuModalLabel">Add new menu</h5>
                            <button id="button-close-modal-menu" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} encType="multipart/form-data">
                                <div className="row mb-4">
                                    <div className="col">
                                        <input name="name" type="text" className="form-control" id="menuNameInput" placeholder="Menu Name" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label htmlFor="menuDescriptionInput">Menu description</label>
                                        <textarea name="description" className="form-control" id="menuDescriptionInput" rows="3" required></textarea>
                                    </div>
                                </div>
                                
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

MenuModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired
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
)(withRouter(MenuModal));