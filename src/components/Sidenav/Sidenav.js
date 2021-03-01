import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import EditCategoryModal from '../Category/EditCategoryModal';
import { getUserRole } from '../../api/TokenHandler';
import DeleteCategoryModal from '../Category/DeleteCategoryModal';
import DeleteUserModal from '../User/DeleteUserModal';

class Sidenav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: {
                id: '',
                name: '',
                description: ''
            },
            selectedUser: {
                id: '',
                email: '',
                restaurant: ''
            }
        }
    }

    async getMenuDetail(id) {
        const { appActions } = this.props;
        await appActions.getMenuDetailInitialData(id);
    }

    async getRestaurantDetail(id) {
        const { appActions } = this.props;
        await appActions.getRestaurantDetailInitialData(id)
    }

    handleChangeCategory = (e) => {
        this.setState({
            selectedCategory: {
                ...this.state.selectedCategory,
                [e.target.name]: e.target.value
            }
        });
    }

    setSelectedCategory(item) {
        this.setState({selectedCategory: item});
    }

    setSelectedUser(user) {
        this.setState({selectedUser: user})
    }

    render() {
        const { restaurantDetail, restaurantDataReady, restaurants, restaurantsDataReady } = this.props;
        return (
            <nav id="main-sidebar">
                <div className="row my-4">
                    <div className="col-12 text-center">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mainModal">
                            Add
                        </button>
                    </div>
                </div>
                {
                    restaurantsDataReady && getUserRole() === 'admin' ?
                    <div className="row">
                        <h5 className="mt-3">Restaurants</h5>
                        {
                            restaurants.map(restaurant => {
                                return (
                                    <div className="col-12 text-center mb-2" key={restaurant.id}>
                                         <button className="btn btn-ligth" onClick={() => this.getRestaurantDetail(restaurant.id)}>
                                            {restaurant.name}
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : <> </>
                }
                <div className="row">
                    <h5 className="mt-3">Menus</h5>
                {
                    restaurantDataReady ?
                    restaurantDetail?.menus.map((menu, index) => {
                        return (
                            <div className="col-12 text-center mb-2" key={menu.id+index}>
                                <button className="btn btn-ligth" onClick={() => this.getMenuDetail(menu.id)}>
                                    {menu.name}
                                </button>
                            </div>
                        )
                    })
                    :
                    <></>
                }
                </div>
                <div className="row">
                    <h5 className="mt-3">Categories</h5>
                    <EditCategoryModal category={{...this.state.selectedCategory}} handleChangeCategory={this.handleChangeCategory}/>
                    <DeleteCategoryModal category={{...this.state.selectedCategory}}/>
                {
                    restaurantDataReady ?
                    restaurantDetail.categories.map(category => {
                        return (
                            <div className="col-12 text-center mb-2" key={category.id}>
                                {category.name}
                                <br/>
                                <button className="btn btn-primary" onClick={() => this.setSelectedCategory(category)} data-bs-toggle="modal" data-bs-target="#editCategoryModal">
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => this.setSelectedCategory(category)} data-bs-toggle="modal" data-bs-target="#deleteCategoryModal">
                                    Delete
                                </button>
                            </div>
                        )
                    })
                    :
                    <></>
                }
                </div>
                <div className="row">
                    { (getUserRole() === 'admin' || getUserRole() === 'owner') ?
                    <h5 className="mt-3">Users</h5>
                    :
                    <></>
                    }
                    { restaurantDataReady && getUserRole() === 'admin'  ? <h6 className="mt-2">Owners</h6> : <></>}
                    {
                    restaurantDataReady && getUserRole() === 'admin' ?
                    restaurantDetail.owner.map(owner => {
                        return (
                            <div className="col-12 text-center mb-2" key={owner.id}>
                                {owner.email}
                                <br/>
                                {/* <button className="btn btn-primary" onClick={() => this.setSelectedUser(owner)} data-bs-toggle="modal" data-bs-target="#editCategoryModal">
                                    Edit
                                </button> */}
                                <button className="btn btn-danger" onClick={() => this.setSelectedUser(owner)} data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                                    Delete
                                </button>
                            </div>
                        )
                    })
                    :
                    <></>
                    }
                    { restaurantDataReady && (getUserRole() === 'admin' || getUserRole() === 'owner') ? 
                    <div> <h6 className="mt-2">Managers</h6> <DeleteUserModal user={this.state.selectedUser} /> </div>
                    : <></>}
                    {
                    restaurantDataReady && (getUserRole() === 'admin' || getUserRole() === 'owner') ?
                    restaurantDetail.business_manager.map(manager => {
                        return (
                            <div className="col-12 text-center mb-2" key={manager.id}>
                                {manager.email}
                                <br/>
                                {/* <button className="btn btn-primary" onClick={() => this.setSelectedUser(manager)} data-bs-toggle="modal" data-bs-target="#editCategoryModal">
                                    Edit
                                </button> */}
                                <button className="btn btn-danger" onClick={() => this.setSelectedUser(manager)} data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                                    Delete
                                </button>
                            </div>
                        )
                    })
                    :
                    <></>
                    }
                </div>
            </nav>
        );
    }
}

Sidenav.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    restaurantDataReady: PropTypes.bool.isRequired,
    restaurants: PropTypes.array.isRequired,
    restaurantsDataReady: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    menuDetail: state.app.menuDetail,
    menuDataReady: state.app.menuDataReady,
    restaurants: state.app.restaurants,
    restaurantsDataReady: state.app.restaurantsDataReady
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sidenav);
