import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import EditCategoryModal from '../Category/EditCategoryModal';
import { getUser, getUserRole } from '../../api/TokenHandler';
import DeleteCategoryModal from '../Category/DeleteCategoryModal';
import DeleteUserModal from '../User/DeleteUserModal';
import TreeMenu from 'react-simple-tree-menu';


const DATA_TYPES = {
    restaurant: 'restaurant',
    menu: 'menu',
    category: 'category',
    item: 'item',
    user: 'user'
};

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

    handleTreeOnToggle = async (data) => {
        const bootstrap = window.bootstrap;
        let categoryModal = null;
        let userModal = null;
        const editCategoryId = document.getElementById('editCategoryModal');
        if (editCategoryId)
            categoryModal = new bootstrap.Modal(editCategoryId);

        const editUserId = document.getElementById('deleteUserModal');
        if (editUserId)
            userModal = new bootstrap.Modal(editUserId);

        switch (data.type) {
            case DATA_TYPES.restaurant:
                this.getRestaurantDetail(data.id);
                break;
            case DATA_TYPES.menu:
                await this.getRestaurantDetail(data.parents.restaurant.id);
                await this.getMenuDetail(data.id);
                break;
            case DATA_TYPES.category:
                if (data.id === 'no_category') {
                    break;
                }
                this.setSelectedCategory({id: data.id, name: data.category.name, description: data.category.description})
                if (categoryModal !== null) {
                    categoryModal.toggle()
                }
                break;
            case DATA_TYPES.item:
                break;
            case DATA_TYPES.user:
                this.setSelectedUser({email: data.label, id: data.id})
                if (userModal !== null) {
                    userModal.toggle()
                }
                break;
            default:
                break;
        }
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

    getUserListData(user, restaurant) {
        return { key: user.id, id: user.id, type: DATA_TYPES.user, label: user.email, parents: { restaurant } };
    }

    getCategoriesData(categoriesObj, restaurant, menu) {
        return Object.keys(categoriesObj).map((categoryId) => {
            return {
                category: categoriesObj[categoryId],
                key: categoryId,
                id: categoryId,
                label: categoriesObj[categoryId].name,
                type: DATA_TYPES.category,
                nodes: categoriesObj[categoryId].items.map((item) => {
                    return {
                        key: item.id,
                        id: item.id,
                        label: item.name,
                        type: DATA_TYPES.item,
                        parents: { restaurant, menu, category: categoriesObj[categoryId] }
                    };
                }),
                parents: { restaurant, menu }
            }
        })
    }

    populateRestaurantNodes(restaurant) {
        const menus = restaurant.menus.map((menu) => {
            return { key: menu.id, id: menu.id, type: DATA_TYPES.menu, label: menu.name, nodes: this.getCategoriesData(menu.categories, restaurant, menu), parents: { restaurant } };
        });
        const menusRoot = { key: 'menus_root', label: 'Menus', nodes: menus };
        const usersOwnerRoot = { key: 'users_owner_root', label: 'Owner', nodes: restaurant.owner.map((owner) => this.getUserListData(owner, restaurant)) };
        const usersBusinessManagerRoot = { key: 'users_business_manager_root', label: 'Business Manager', nodes: restaurant.business_manager.map((manager) => this.getUserListData(manager, restaurant)) };
        let usersRoot = { key: 'users_root', label: 'Users', nodes: [ usersOwnerRoot, usersBusinessManagerRoot ] };
        const userRole = getUserRole();
        if (userRole === 'owner') {
            usersRoot = { key: 'users_root', label: 'Users', nodes: [ usersBusinessManagerRoot ] };
        } else if (userRole === 'bussines manager' || userRole === '') {
            return [ menusRoot ];
        }

        return [ menusRoot, usersRoot ];
    }

    convertRestaurantDataToTreeView = (data) => {
        const userRole = getUserRole();
        if (userRole !== 'admin') {
            const user = getUser();
            data = data.filter(restaurant => restaurant.id === user.restaurant)
        }

        const restaurants = data.map((restaurant) => {
            return { key: restaurant.id, id: restaurant.id, type: DATA_TYPES.restaurant, label: restaurant.name, nodes: this.populateRestaurantNodes(restaurant), restaurant };
        });
        const restaurantsRoot = { key: 'restaurants_root', label: 'Restaurants', nodes: restaurants };

        return [ restaurantsRoot ];
    }

    render() {
        const { restaurantTreeViewData } = this.props;

        const treeData = this.convertRestaurantDataToTreeView(restaurantTreeViewData)

        return (
            <div id="main-sidebar" className="col-md-3 col-sm-4 col-xs-12 col-lg-3 col-xl-2">
                <div className="row my-4">
                    <div className="col">
                        <div className="text-center">
                            <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#mainModal">
                                <b>+</b> ADD
                            </button>
                        </div>
                    </div>
                </div>
                <TreeMenu data={treeData} onClickItem={this.handleTreeOnToggle} />
                <EditCategoryModal category={{...this.state.selectedCategory}} handleChangeCategory={this.handleChangeCategory}/>
                <DeleteCategoryModal category={{...this.state.selectedCategory}}/>
                <DeleteUserModal user={this.state.selectedUser} />
            </div>
        );
    }
}

Sidenav.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    restaurantDataReady: PropTypes.bool.isRequired,
    restaurants: PropTypes.array.isRequired,
    restaurantsDataReady: PropTypes.bool.isRequired,
    restaurantTreeViewData: PropTypes.array.isRequired,
    restaurantTreeViewDataReady: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    menuDetail: state.app.menuDetail,
    menuDataReady: state.app.menuDataReady,
    restaurants: state.app.restaurants,
    restaurantsDataReady: state.app.restaurantsDataReady,
    restaurantTreeViewData: state.app.restaurantTreeViewData,
    restaurantTreeViewDataReady: state.app.restaurantTreeViewDataReady,
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sidenav);
