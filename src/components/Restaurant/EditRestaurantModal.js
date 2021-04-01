import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { CirclePicker } from 'react-color';

class EditRestaurantModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.restaurantDetail.settings,
            changedBanner: false
        };
        this.handleChangeRestaurant = this.props.handleChangeRestaurant.bind(this);
        this.handleBackgroudImageChange = this.handleBackgroudImageChange.bind(this);
    }
    
    handleBackgroundChange = (color) => {
        this.setState({ background: color.hex });
    }

    handleColorChange = (color) => {
        this.setState({ color: color.hex });
    }

    handleBackgroudImageChange(e) {
        e.stopPropagation();
        this.setState({ backgroundImage: e.target.checked });
    }

    async handleSubmit (event, props) {
        event.preventDefault();
        const { appActions } = props;

        event.target = document.getElementById('editRestaurantForm');

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
        if (response) {
            document.getElementById('button-close-modal-restaurant-edit').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    handleChangeBanner = () => {
        this.setState({changedBanner: true})
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
                            <form id="editRestaurantForm" onSubmit={(e) => this.handleSubmit(e, this.props)} method="PATCH" encType="multipart/form-data">
                                <div className="row mb-4">
                                    <div className="col">
                                        <input name="name" type="text" className="form-control" id="restaurantNameInputEdit" defaultValue={newRestaurant.name} onChange={ handleChangeRestaurant } placeholder="My Restaurant" required/>
                                    </div>
                                    <div className="col">
                                        <input name="phone" type="tel" className="form-control" id="restaurantPhoneInputEdit" defaultValue={newRestaurant.phone} onChange={ handleChangeRestaurant } placeholder="3453456" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                    <input name="address" type="address" className="form-control" id="restaurantAddressInputEdit" defaultValue={newRestaurant.address} onChange={ handleChangeRestaurant } placeholder="Street..." required/>
                                    </div>
                                    <div className="col">
                                        <input name="city" type="text" className="form-control" id="restaurantCityInput" placeholder="City" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <input name="state" type="text" className="form-control" id="restaurantStateInput" placeholder="State/Province" required/>
                                    </div>
                                    <div className="col">
                                        <input name="zip" type="text" className="form-control" id="restaurantZipInput" placeholder="Zip/Postal Code" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <input name="email" type="email" className="form-control" id="restaurantEmailInputEdit" defaultValue={newRestaurant.email} onChange={ handleChangeRestaurant } placeholder="restaurant@email.com" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6 file-input">
                                        <label htmlFor="restaurantLogoInputEdit">Restaurant logo</label>
                                        <input name="logo" type="file" className="form-control-file" onChange={ handleChangeRestaurant } id="restaurantLogoInputEdit" />
                                    </div>
                                    <div className="col-6 file-input">
                                        <label htmlFor="restaurantBannerInputEdit">Restaurant banner</label>
                                        <input name="banner" type="file" className="form-control-file" onChange={ this.handleChangeBanner } id="restaurantBannerInputEdit" />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6 pd-3 form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="restaurantBackgroundInputEdit" defaultChecked={this.state.backgroundImage} onClick={ this.handleBackgroudImageChange } />
                                    <label className="form-check-label" htmlFor="restaurantBackgroundInput">Banner as background</label>
                                    {
                                        restaurantDetail.banner === '' && this.state.backgroundImage && !this.state.changedBanner ?
                                        <p className="text-danger"><b>Add a banner image</b></p> :
                                        <></>
                                    }
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label htmlFor="restaurantBannerInput" className="mb-3">Restaurant background</label>
                                        <CirclePicker 
                                            circleSize={24}
                                            onChange={ this.handleBackgroundChange }
                                            value={newRestaurant.settings.background} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="restaurantBannerInput" className="mb-3">Restaurant color</label>
                                        <CirclePicker 
                                            circleSize={24}
                                            onChange={ this.handleColorChange }
                                            value={newRestaurant.settings.color} />
                                    </div>
                                </div>
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-danger me-3" data-bs-dismiss="modal">Cancel</button>
                                    <input type="submit" className="btn btn-success" onClick={e => this.handleSubmit(e, this.props)} value="Submit" disabled={restaurantDetail.banner === '' && this.state.backgroundImage && !this.state.changedBanner} />
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
