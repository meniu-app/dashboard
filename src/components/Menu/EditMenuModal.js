import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { withRouter } from 'react-router-dom';

class EditMenuModal extends Component {

    constructor(props) {
        super(props);
        this.handleChangeMenu = this.props.handleChangeMenu.bind(this);
    }

    async handleSubmit (event, props) {
        const { appActions, menu } = props;
        event.preventDefault();
        const data = new FormData(event.target)
        const response = await appActions.editMenuData(data, menu.id);
        if (response){
            document.getElementById('button-close-modal-menu-edit').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    render () {
        const { formLoading, menu } = this.props;

        const newMenu = {...menu};

        return (
            <div className="modal fade" id="editMenuModal" tabIndex="-1" aria-labelledby="editMenuModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editMenuModalLabel">Edit menu</h5>
                            <button id="button-close-modal-menu-edit" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} method="PATCH" encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="menuNameInputEdit" className="form-label">Menu name</label>
                                    <input name="name" type="text" className="form-control" id="menuNameInputEdit" defaultValue={newMenu.name} placeholder="My menu" required/>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="menuDescriptionInputEdit">Menu description</label>
                                    <textarea name="description" className="form-control" id="menuDescriptionInputEdit" defaultValue={newMenu.description} rows="3" required></textarea>
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

EditMenuModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired,
    menu: PropTypes.object.isRequired,
    handleChangeMenu: PropTypes.func.isRequired
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
)(withRouter(EditMenuModal));