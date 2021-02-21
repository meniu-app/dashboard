import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { TwitterPicker } from 'react-color';

class EditRestaurantModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.restaurantDetail.settings
        };
        this.handleChangeRestaurant = this.props.handleChangeRestaurant.bind(this);
    }
    
    handleBackgroundChange = (color) => {
        this.setState({ background: color.hex });
    }

    handleColorChange = (color) => {
        this.setState({ color: color.hex });
    }

    handleBackgroudImageChange = (e) => {
        this.setState({ backgroundImage: e.target.checked });
    }

    async handleSubmit (event, props) {
        const { appActions } = props;

        event.preventDefault();
        const data = new FormData(event.target);
        const settings = {
            color: this.state.color,
            backgroundColor: this.state.background,
            backgroundImage: this.state.backgroundImage
        }
        if (event.target.banner.value === '')
            data.delete('banner');
        if (event.target.logo.value === '')
            data.delete('logo');

        data.append('settings', JSON.stringify(settings));
        const response = await appActions.editRestaurantData(data, props.restaurantDetail.id)
        if (response)
            document.getElementById('button-close-modal-restaurant-edit').click();
    }

    render () {
        const { formLoading, restaurantDetail, handleChangeRestaurant } = this.props;

        const newRestaurant = {...restaurantDetail};

        return (
            <div className="modal fade" id="editRestaurantModal" tabIndex="-1" aria-labelledby="editRestaurantModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editRestaurantModalLabel">Edit restaurant</h5>
                            <button id="button-close-modal-restaurant-edit" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="restaurantNameInput" className="form-label">Restaurant name</label>
                                    <input name="name" type="text" className="form-control" id="restaurantNameInput" defaultValue={newRestaurant.name} onChange={ handleChangeRestaurant } placeholder="My Restaurant" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="restaurantAddressInput" className="form-label">Restaurant address</label>
                                    <input name="address" type="address" className="form-control" id="restaurantAddressInput" defaultValue={newRestaurant.address} onChange={ handleChangeRestaurant } placeholder="Street..." required/>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="restaurantEmailInput">Restaurant email</label>
                                    <input name="email" type="email" className="form-control" id="restaurantEmailInput" defaultValue={newRestaurant.email} onChange={ handleChangeRestaurant } placeholder="restaurant@email.com" required/>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="restaurantPhoneInput">Restaurant phone</label>
                                    <input name="phone" type="phone" className="form-control" id="restaurantPhoneInput" defaultValue={newRestaurant.phone} onChange={ handleChangeRestaurant } placeholder="3453456" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="restaurantLogoInput">Restaurant logo</label>
                                    <input name="logo" type="file" className="form-control-file" onChange={ handleChangeRestaurant } id="restaurantLogoInput" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="restaurantBannerInput">Restaurant banner</label>
                                    <input name="banner" type="file" className="form-control-file" onChange={ handleChangeRestaurant } id="restaurantBannerInput" />
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="restaurantBackgroundInput" defaultChecked={newRestaurant.settings.backgroundImage} onChange={ this.handleBackgroudImageChange } />
                                    <label className="form-check-label" htmlFor="restaurantBackgroundInput">Banner as background</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="restaurantBannerInput">Restaurant background</label>
                                    <TwitterPicker onChange={ this.handleBackgroundChange } value={newRestaurant.settings.background} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="restaurantBannerInput">Restaurant color</label>
                                    <TwitterPicker onChange={ this.handleColorChange } value={newRestaurant.settings.color} />
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

EditRestaurantModal.propTypes = {
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
)(EditRestaurantModal);
