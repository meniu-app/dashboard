import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { CirclePicker } from 'react-color';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.restaurantDetail?.settings?.color,
            background: props.restaurantDetail?.settings?.backgroundColor,
            formEdit: false,
            address: ''
        }
        this.inputRef = createRef(null)
    }
    
    handleBackgroundChange = (color) => {
        this.setState({ background: color.hex });
    }

    handleColorChange = (color) => {
        this.setState({ color: color.hex });
    }

    handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
      };

    async handleSubmit (event, props) {
        event.preventDefault();
        const { appActions } = props;

        event.target = document.getElementById('editSettingsForm');

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
            this.setState({formEdit: false})
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    handleChangeBanner = () => {
        this.setState({changedBanner: true})
    }

    render () {
        const { formLoading, restaurantDetail, handleChangeRestaurant } = this.props
        const newRestaurant = {...restaurantDetail};

        return (
            <div className="container mt-4">
                {newRestaurant.id ?
                    <div className="row">
                        <h3 className="my-3">Store Settings</h3>
                        { !formLoading ?
                        <form className="mb-5" id="editSettingsForm" onSubmit={(e) => this.handleSubmit(e, this.props)} method="PATCH" encType="multipart/form-data">
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="">
                                        <label htmlFor="settingsNameInputEdit"><b>Store Name</b></label>
                                        <button className="btn btn-link" type="button" onClick={() => this.setState({formEdit: !this.state.formEdit})}>
                                            {this.state.formEdit ? 'Editing' : 'Edit'}
                                        </button>
                                    </div>
                                    { this.state.formEdit ?
                                        <input name="name" type="text" className="form-control" id="settingsNameInputEdit" defaultValue={newRestaurant.name} onChange={ handleChangeRestaurant } placeholder="My Restaurant" required/> :
                                        <p className="mt-2">{newRestaurant.name}</p>
                                    }
                                </div>
                               
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <label htmlFor="settingsAddressInputEdit"><b>Address</b></label>
                                    { this.state.formEdit ?
                                        <input name="address" type="address" className="form-control" id="settingsAddressInputEdit" defaultValue={newRestaurant.address} onChange={ handleChangeRestaurant } placeholder="Street..." required/> :
                                        <p className="mt-2">{newRestaurant.address}</p>
                                    }










                            <PlacesAutocomplete
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                    className="form-control"
                                    />
                                    <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                            })}
                                            key={1}
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
                                    <label htmlFor="settingsPhoneInputEdit"><b>Store Phone Number</b></label>
                                    { this.state.formEdit ?
                                        <input name="phone" type="tel" className="form-control" id="settingsPhoneInputEdit" defaultValue={newRestaurant.phone} onChange={ handleChangeRestaurant } placeholder="3453456" required/> :
                                        <p className="mt-2">{newRestaurant.phone}</p>
                                    }
                                </div>
                            </div>
                            {/* <div className="row mb-4">
                                <div className="col">
                                    <input name="email" type="email" className="form-control" id="settingsEmailInputEdit" defaultValue={newRestaurant.email} onChange={ handleChangeRestaurant } placeholder="restaurant@email.com" required/>
                                </div>
                            </div> */}
                            <div className="row mb-4">
                                <div className="col">
                                    <label htmlFor="settingsLogoInputEdit"><b>Store Logo</b></label>
                                    { this.state.formEdit ?
                                        <input name="logo" type="file" className="form-control-file" onChange={ handleChangeRestaurant } id="settingsLogoInputEdit" /> :
                                        <div className="mt-2">
                                            <img style={{maxWidth: '200px'}} src={newRestaurant.logo_url}/>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <label className="mb-3"><b>Store Brand Color</b></label>
                                    { this.state.formEdit ?
                                        <CirclePicker 
                                            circleSize={24}
                                            onChange={ this.handleBackgroundChange }
                                            color={newRestaurant.settings.backgroundColor} /> :
                                        <div className="color-circle" style={{background: newRestaurant.settings.backgroundColor}}></div>   
                                    }
                                </div>
                                <div className="col-6">
                                    <label className="mb-3"><b>Store Text Color</b></label>
                                    { this.state.formEdit ?
                                        <CirclePicker 
                                            circleSize={24}
                                            onChange={ this.handleColorChange }
                                            color={newRestaurant.settings.color} /> :
                                        <div className="color-circle" style={{background: newRestaurant.settings.color}}></div>   
                                    }
                                </div>
                            </div>
                            { this.state.formEdit ?
                                <div className="mt-3 d-flex">
                                    <button type="button" className="btn btn-danger me-3" onClick={() => this.setState({formEdit: false})}>Cancel</button>
                                    <input type="submit" className="btn btn-success" onClick={e => this.handleSubmit(e, this.props)} value="Save" />
                                </div> : <></>
                            }
                        </form>
                        : <Spinner />
                        }
                    </div> :
                    <h4 className="text-center">Select a restaurant</h4>
                }
            </div>
        )
    }
}

Settings.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    formLoading: PropTypes.bool.isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    handleChangeRestaurant: PropTypes.func
};

const mapStateToProps = (state) => ({
    menuDetail: state.app.menuDetail,
    menuDetailDataReady: state.app.menuDetailDataReady,
    formLoading: state.app.formLoading,
    restaurantDetail: state.app.restaurantDetail
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Settings);
