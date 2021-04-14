import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as appAction from '../actions/appActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { getUser, getUserRole, removeTokens, removeUser } from '../api/TokenHandler';
import EditRestaurantModal from './Restaurant/EditRestaurantModal';
import DeleteRestaurantModal from './Restaurant/DeleteRestaurantModal';
import Logo from '../assets/img/lulo-logo.png'

class Navbar extends Component {

    logout = async () => {
        const { appActions } = this.props;
        await appActions.postLogout();
        removeTokens();
        removeUser();
        this.props.history.push('/');
    }

    getUserFullName (firstName, lastName) {
        let fullName = '';
        if (firstName !== null && firstName !== '')
            fullName += `${firstName} `;
        if (lastName !== null && lastName !== '')
            fullName += `${lastName}`;
        if (fullName === '') {
            return getUserRole();
        }
        return fullName;
    }

    handleChangeRestaurant = () => {}

    render() {
        const { isLoggedIn, restaurantDetail, restaurantDataReady } = this.props;
        const user = getUser();

        return (
            <nav id="main-nav" className="navbar navbar-expand-md navbar-light">
                <div className="container-fluid">
                    <div className="navbar-brand d-flex">
                        <Link className="navbar-brand" to="/">
                            <img src={Logo} alt="Logo" className="lulo-logo" />
                        </Link>
                    </div>
                    {
                        (getUserRole() === 'admin' || getUserRole() === 'owner') &&
                        <div>
                            <DeleteRestaurantModal restaurantDetail={restaurantDetail}/>
                            {restaurantDataReady ?
                                <EditRestaurantModal restaurantDetail={restaurantDetail} handleChangeRestaurant={this.handleChangeRestaurant} />
                                : <></>
                            }
                        </div>
                    }
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <ul className="navbar-nav mr-auto">
                            {!isLoggedIn &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/login">Login</Link>
                                </li>
                            }
                            {isLoggedIn &&
                                (
                                <>
                                    {
                                    (getUserRole() === 'admin' || getUserRole() === 'owner') && restaurantDataReady ?
                                    <li className="nav-item dropdown me-5">
                                        <button className="btn btn-outline-dark dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fas fa-utensils me-2"></i>
                                            {restaurantDetail.name}
                                        </button>
                                        { user ?
                                        <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
                                            {
                                            (getUserRole() === 'admin' || getUserRole() === 'owner') && restaurantDataReady?
                                            <li className="dropdown-item">
                                                <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editRestaurantModal">Edit</button>
                                                <button className="btn btn-outline-danger btn-sm ms-3" data-bs-toggle="modal" data-bs-target="#deleteRestaurantModal">Delete</button>
                                            </li>:<></>
                                            }
                                        </ul>:<></>
                                        }
                                    </li>:<button className="btn btn-ligth">{restaurantDetail.name}</button>
                                    }
                                    <li className="nav-item dropdown">
                                    { user ?
                                        <div className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fas fa-user me-1"></i> {this.getUserFullName(user.first_name, user.last_name)}
                                        </div>:<></>
                                    }
                                    { user ?
                                        <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
                                            <li>
                                                <Link className="dropdown-item" to="/profile">Profile</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/">Settings</Link>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li>
                                                <span onClick={this.logout} className="nav--logout dropdown-item">Sign Out</span>
                                            </li>
                                        </ul>:<></>
                                    }
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/help" >Help</Link>
                                    </li>
                                </>
                                )}
                        </ul>
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

