import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as appAction from '../actions/appActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { getUserRole, removeTokens, removeUser } from '../api/TokenHandler';
import config from '../config';
import EditRestaurantModal from './Restaurant/EditRestaurantModal';
import DeleteRestaurantModal from './Restaurant/DeleteRestaurantModal';

class Navbar extends Component {

    logout = async () => {
        const { appActions } = this.props;
        await appActions.postLogout();
        removeTokens();
        removeUser();
        this.props.history.push('/');
    }

    handleChangeRestaurant = () => {}

    render() {
        const { isLoggedIn, restaurantDetail, restaurantDataReady } = this.props;
        const env = config.env;
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container-fluid">
                    {
                     restaurantDataReady ?
                        <Link className="navbar-brand d-flex" to="/">
                            {restaurantDetail.name} {restaurantDetail.address} {env === 'development' ? ' - Dev' : ''}
                            {
                            (getUserRole() === 'admin' || getUserRole() === 'owner') &&
                            <div className="d-flex">
                                <button className="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#editRestaurantModal">Edit restaurant</button>
                                <button className="btn btn-danger ms-3" data-bs-toggle="modal" data-bs-target="#deleteRestaurantModal">Delete restaurant</button>
                                <EditRestaurantModal restaurantDetail={restaurantDetail} handleChangeRestaurant={this.handleChangeRestaurant} />
                            </div>
                            }
                        </Link> :
                        <Link className="navbar-brand" to="/">
                            Meniu Dashboard {env === 'development' ? ' - Dev' : ''}
                        </Link>
                    }
                    {
                        (getUserRole() === 'admin' || getUserRole() === 'owner') &&
                        <DeleteRestaurantModal restaurantDetail={restaurantDetail}/>
                    }
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav mr-auto">
                            {!isLoggedIn &&
                                <Link className="nav-link" to="/auth/login">Login</Link>}
                            {isLoggedIn &&
                                (
                                <>
                                    <Link className="nav-link" to="/profile" >Profile</Link>
                                    <span onClick={this.logout} className="nav--logout nav-link">Logout</span>
                                </>
                                )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    history: PropTypes.object,
    restaurantDetail: PropTypes.object.isRequired,
    restaurantDataReady: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.app.isLoggedIn,
    restaurantDetail: state.app.restaurantDetail,
    restaurantDataReady: state.app.restaurantDataReady
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navbar));

