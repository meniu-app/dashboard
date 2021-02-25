import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import EditCategoryModal from '../Category/EditCategoryModal';
import { getUserRole } from '../../api/TokenHandler';

class Sidenav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: {
                id: '',
                name: '',
                description: ''
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

    render() {
        const { restaurantDetail, restaurantDataReady, restaurants, restaurantsDataReady } = this.props;
        return (
            <nav id="main-sidebar">
                <div className="row my-4">
                    <div className="col-12 text-center">
                        <button type="button" disabled={!restaurantDataReady} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mainModal">
                            Add
                        </button>
                    </div>
                </div>
                {
                    restaurantsDataReady && getUserRole() === 'admin' ?
                    <div className="row">
                        <h5>Restaurants</h5>
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
                    <h5>Menus</h5>
                {
                    restaurantDataReady &&
                    restaurantDetail.menus.map(menu => {
                        return (
                            <div className="col-12 text-center mb-2" key={menu.id}>
                                <button className="btn btn-ligth" onClick={() => this.getMenuDetail(menu.id)}>
                                    {menu.name}
                                </button>
                            </div>
                        )
                    })
                }
                </div>
                <div className="row">
                    <h5>Categories</h5>
                    <EditCategoryModal category={{...this.state.selectedCategory}} handleChangeCategory={this.handleChangeCategory}/>
                {
                    restaurantDataReady &&
                    restaurantDetail.categories.map(category => {
                        return (
                            <div className="col-12 text-center mb-2" key={category.id}>
                                <button className="btn btn-ligth" onClick={() => this.setSelectedCategory(category)} data-bs-toggle="modal" data-bs-target="#editCategoryModal">
                                    {category.name}
                                </button>
                            </div>
                        )
                    })
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
