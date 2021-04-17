import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { CirclePicker } from 'react-color';
import { getUser, getUserRole } from '../../api/TokenHandler';

class RestaurantModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            background: '#fff',
            color: '#000'
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

    render () {
        const { formLoading } = this.props;

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
                                        <input name="address" type="text" className="form-control" id="restaurantAddressInput" placeholder="Street" required/>
                                    </div>
                                    <div className="col">
                                        <input name="zip" type="text" className="form-control" id="restaurantZipInput" placeholder="Zip/Postal Code"/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <select name="country" className="form-control" id="restaurantCountryInput" placeholder="Country">
                                            <option selected>Select Country</option>
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
                                    <div className="col-12">
                                        <input name="email" type="email" className="form-control" id="restaurantEmailInput" placeholder="restaurant@email.com"/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6 file-input">
                                        <label htmlFor="restaurantLogoInput">Restaurant Logo</label>
                                        <input name="logo" type="file" className="form-control-file" id="restaurantLogoInput" required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <label htmlFor="restaurantBannerInput" className="mb-3">Restaurant Background</label>
                                        <CirclePicker 
                                            circleSize={24}
                                            onChange={ this.handleBackgroundChange } />
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
