import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { CirclePicker } from 'react-color';
import PlacesAutocomplete, {
    // geocodeByAddress,
    // getLatLng
} from 'react-places-autocomplete';

class EditRestaurantModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.restaurantDetail.settings,
            changedBanner: false,
            address: props.restaurantDetail?.address
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
            backgroundColor: this.state.background
        }
        if (event.target.logo.value === '')
            data.delete('logo');

        data.append('settings', JSON.stringify(settings));
        const response = await appActions.editRestaurantData(data, props.restaurantDetail.id)
        if (response) {
            document.getElementById('button-close-modal-restaurant-edit').click();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    handleChange = address => {
        this.setState({ address });
    };
     
    handleSelect = address => {
        this.setState({ address })
        // geocodeByAddress(address)
        //     .then(results => getLatLng(results[0]))
        //     .then(latLng => console.log('Success', latLng))
        //     .catch(error => console.error('Error', error));
    };

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
                                        <PlacesAutocomplete
                                                value={this.state.address}
                                                onChange={this.handleChange}
                                                onSelect={this.handleSelect}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <div>
                                                    <input
                                                    {...getInputProps({
                                                        placeholder: 'Street...',
                                                        className: 'location-search-input',
                                                    })}
                                                    className="form-control"
                                                    name="address"
                                                    />
                                                    <div className="autocomplete-dropdown-container">
                                                    {loading && <div>Loading...</div>}
                                                    {suggestions.map((suggestion, idx) => {
                                                        const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                        const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                        return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                            })}
                                                            key={idx}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                        );
                                                    })}
                                                    </div>
                                                </div>
                                                )}
                                        </PlacesAutocomplete>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <select name="country" className="form-control" id="restaurantCountryInput" placeholder="Country" defaultValue=''>
                                            <option value=''>Select Country</option>
                                            <option value="CO">Colombia</option>
                                            <option value="US">United States</option>
                                            <option value="ES">Spain</option>
                                        </select> 
                                    </div>
                                    <div className="col">
                                        <input name="zip" type="text" className="form-control" id="restaurantZipInput" placeholder="Zip/Postal Code" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <input name="email" type="email" className="form-control" id="restaurantEmailInputEdit" defaultValue={newRestaurant.email} onChange={ handleChangeRestaurant } placeholder="restaurant@email.com" />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6 file-input">
                                        <label htmlFor="restaurantLogoInputEdit">Restaurant Logo</label>
                                        <input name="logo" type="file" className="form-control-file" onChange={ handleChangeRestaurant } id="restaurantLogoInputEdit" />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label className="mb-3">Restaurant Background</label>
                                        <CirclePicker 
                                            circleSize={24}
                                            onChange={ this.handleBackgroundChange }
                                            color={newRestaurant.settings.backgroundColor} />
                                    </div>
                                    <div className="col-6">
                                        <label className="mb-3">Restaurant color</label>
                                        <CirclePicker 
                                            circleSize={24}
                                            onChange={ this.handleColorChange }
                                            color={newRestaurant.settings.color} />
                                    </div>
                                </div>
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-danger me-3" data-bs-dismiss="modal">Cancel</button>
                                    <input type="submit" className="btn btn-success" onClick={e => this.handleSubmit(e, this.props)} value="Submit" />
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
