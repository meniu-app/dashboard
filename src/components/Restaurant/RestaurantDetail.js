import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import {  Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { getParameterByName } from '../../api/Helpers';
import { track } from '../../mixpanel';

/**
 * Load Components
 */
const DishDetail = lazy(() => import('../Dish/DishDetail'));
const MenuAccordion = lazy(() => import('../Restaurant/MenuAccordion'));
const RestaurantData = lazy(() => import('../Restaurant/RestauranData'));

import Spinner from '../Spinner';

class RestaurantDetail extends Component {

    async componentDidMount() {
        const { appActions } = this.props;
        const id = this.props.match.params.id;
        const scanned = getParameterByName('scanned', this.props.location.search);
        let isScanned = false;

        if (scanned === 'true') isScanned = true;
        const restaurantData = await appActions.getRestaurantDetailInitialData(id, isScanned);
        if (!restaurantData.payload?.error) {
            const menuId = restaurantData.payload.data.menus.length > 0 ? restaurantData.payload.data.menus[0].id : '';
            await appActions.getMenuDetailInitialData(menuId);
        } else this.props.history.push('/');
    }

    async componentWillUnmount() {
        const { appActions } = this.props;
        await appActions.removeRestaurantDetailInitialData();
        await appActions.removemenuDetailInitialData();
    }

    render () {
        const { restaurant, restaurantDataReady, isScanned, restaurantMenus, restaurantMenusDataReady } = this.props;
        let restaurantSettings = {}

        // Using mixpanel variable and just Once
        if (restaurantDataReady) track('Meniu-View', { event: 'Meniu-View', qrcode: isScanned, itemId: restaurant.id, restaurant });

        // Using restaurant settings
        if (restaurantDataReady) {
            restaurantSettings = restaurant.settings;
            if (restaurant.settings.backgroundImage === true)
                restaurantSettings.backgroundImage = `url(${restaurant.banner_url})`;
        }

        return (
            <div className="container pb-5 px-0">
                <Switch>
                    <Route exact path={`${this.props.match.path}`}>
                        {restaurantDataReady &&
                            <RestaurantData restaurant={restaurant} restaurantSettings={restaurantSettings}></RestaurantData>}
                        {restaurantDataReady && restaurantMenusDataReady &&
                            <MenuAccordion restaurant={restaurant} accordionId="restaurantDetailAccordion" restaurantMenus={restaurantMenus} restaurantSettings={restaurantSettings} isScanned={isScanned}></MenuAccordion>}
                        {!restaurantDataReady && <Spinner />}
                        {!restaurantMenusDataReady && !restaurantMenus?.id && <h6 className="text-center">No available menus</h6>}
                    </Route>
                    <Route exact path={`${this.props.match.url}/dish`}>
                        <Redirect to={`${this.props.match.url}`} />
                    </Route>
                    <Route exact path={`${this.props.match.url}/dish/:dishId`}>
                        <DishDetail restaurantSettings={restaurantSettings} />
                    </Route>
                    <Route path="*">
                        <Redirect to="/"></Redirect>
                    </Route>
                </Switch>
            </div>
        )
    }
}

RestaurantDetail.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDataReady: PropTypes.bool.isRequired,
    restaurantMenus: PropTypes.object.isRequired,
    restaurantMenusDataReady: PropTypes.bool,
    isScanned: PropTypes.bool,
    match: PropTypes.object,
    location: PropTypes.object,
    restaurant: PropTypes.object,
    history: PropTypes.object,
};

const mapStateToProps = (state) => ({
    restaurantDataReady: state.app.restaurantDataReady,
    restaurantMenus: state.app.restaurantMenus,
    restaurantMenusDataReady: state.app.restaurantMenusDataReady,
    isScanned: state.app.isScanned,
    restaurant: state.app.restaurant,
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(RestaurantDetail));
