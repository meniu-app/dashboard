import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { CirclePicker } from 'react-color';
import { getUser, getUserRole } from '../../api/TokenHandler';
import PlacesAutocomplete from 'react-places-autocomplete';
import timezones from '../../components/Settings/timezones';

class RestaurantModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#fff',
            color: '#000',
            address: ''
        };
    }

    handleBackgroundChange = (color) => {
        this.setState({ background: color.hex });
    }

    handleColorChange = (color) => {
        this.setState({ color: color.hex });
    }

    async handleSubmit (event, props) {
        const { appActions } = props;

        event.preventDefault();
        const data = new FormData(event.target);
        data.append('active', true);
        const settings = {
            color: this.state.color,
            backgroundColor: this.state.background
        }
        data.append('settings', JSON.stringify(settings));
        let response = null;
        const user = getUser();
        if (getUserRole() === 'owner' && user.restaurant === null)
            response = await appActions.addRestaurantData(data, true)
        else
            response = await appActions.addRestaurantData(data, false)
        if (response) {
            document.getElementById('button-close-modal-restaurant').click();
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

    colors = () => {
        return [
            "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
            "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39",
            "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#fff", "#000"
        ]
    }

    render () {
        const { formLoading } = this.props;
        const timeZones = timezones;

        return (
            <div className="modal fade" id="restaurantModal" tabIndex="-1" aria-labelledby="restaurantModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="restaurantModalLabel">Add new restaurant</h5>
                            <button id="button-close-modal-restaurant" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} encType="multipart/form-data">
                                <div className="row mb-4">
                                    <div className="col">
                                        <input name="name" type="text" className="form-control" id="restaurantNameInput" placeholder="Restaurant name" required/>
                                    </div>
                                    <div className="col">
                                        <input name="phone" type="phone" className="form-control" id="restaurantPhoneInput" placeholder="Phone" required/>
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
                                            <option value="AE">Argentina</option>
                                            <option value="BO">Bolivia</option>
                                            <option value="BR">Brazil</option>
                                            <option value="CA">Canada</option>
                                            <option value="CL">Chile</option>
                                            <option value="CO">Colombia</option>
                                            <option value="CR">Costa Rica</option>
                                            <option value="DO">Dominican Republic</option>
                                            <option value="CR">Ecuador</option>
                                            <option value="SV">El Salvador</option>
                                            <option value="GT">Guatemala</option>
                                            <option value="HN">Honduras</option>
                                            <option value="MX">Mexico</option>
                                            <option value="NI">Nicaragua</option>
                                            <option value="PA">Panama</option>
                                            <option value="PY">Paraguay</option>
                                            <option value="PE">Peru</option>
                                            <option value="PH">Philippines</option>
                                            <option value="PR">Puerto Rico</option>
                                            <option value="ES">Spain</option>
                                            <option value="US">United States of America</option>
                                            <option value="AR">United Arab Emirates</option>
                                            <option value="UY">Uruguay</option>
                                            <option value="VE">Venezuela</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <input name="zipcode" type="text" className="form-control" id="restaurantZipInput" placeholder="Zip/Postal Code" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label htmlFor="settingsTimrZoneInputEdit"><b>Store Time Zone</b></label>
                                        <select name="time_zone" className="form-control" id="settingsTimrZoneInputEdit" required defaultValue={''}>
                                            {
                                                timeZones.map(timezone => {
                                                    return <option value={timezone.value} key={timezone.value}>{timezone.text}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6 file-input">
                                        <label htmlFor="restaurantLogoInput">Restaurant Logo</label>
                                        <input name="logo" type="file" className="form-control-file" id="restaurantLogoInput" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label className="mb-3">Brand Color</label>
                                        <CirclePicker
                                            circleSize={24}
                                            onChange={ this.handleBackgroundChange }
                                            colors={this.colors()}/>
                                    </div>
                                    <div className="col-6">
                                        <label className="mb-3">Brand Text Color</label>
                                        <CirclePicker
                                            circleSize={24}
                                            onChange={ this.handleColorChange }
                                            colors={this.colors()}/>
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

RestaurantModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    formLoading: PropTypes.bool.isRequired
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
)(RestaurantModal);
