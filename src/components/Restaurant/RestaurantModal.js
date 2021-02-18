import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';

class RestaurantModal extends Component {

    async handleSubmit (event, props) {
        event.preventDefault();
        const { appActions } = props;
        // const {name, address, email, phone} = event.target;

        // const data = {
        //     name: name.value,
        //     address: address.value,
        //     email: email.value,
        //     phone: phone.value,
        //     banner: undefined,
        //     logo: undefined
        // }

        // const banner = new FormData(document.getElementById('restaurantBannerInput'));
        // data.banner = banner;

        // const logo = new FormData(document.getElementById('restaurantLogoInput'));
        // data.logo = logo;
        console.log(event)
        const data = new FormData(event.target)
        await appActions.addRestaurantData(data);
    }

    render () {

        return (
            <div className="modal fade" id="restaurantModal" tabIndex="-1" aria-labelledby="restaurantModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="restaurantModalLabel">Add new restaurant</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="restaurantNameInput" className="form-label">Restaurant name</label>
                                    <input name="name" type="text" className="form-control" id="restaurantNameInput" placeholder="My Restaurant" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="restaurantAddressInput" className="form-label">Restaurant address</label>
                                    <input name="address" type="address" className="form-control" id="restaurantAddressInput" placeholder="Street..." required/>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="restaurantEmailInput">Restaurant email</label>
                                    <input name="email" type="email" className="form-control" id="restaurantEmailInput" placeholder="restaurant@email.com" required/>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="restaurantPhoneInput">Restaurant phone</label>
                                    <input name="phone" type="phone" className="form-control" id="restaurantPhoneInput" placeholder="3453456" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="restaurantLogoInput">Restaurant logo</label>
                                    <input name="logo" type="file" className="form-control-file" id="restaurantLogoInput" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="restaurantBannerInput">Restaurant banner</label>
                                    <input name="banner" type="file" className="form-control-file" id="restaurantBannerInput" />
                                </div>
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

RestaurantModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    categories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    menuDetail: state.app.menuDetail,
    menuDetailDataReady: state.app.menuDetailDataReady,
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RestaurantModal);
