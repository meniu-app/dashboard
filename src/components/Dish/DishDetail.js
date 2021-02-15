import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getParameterByName } from '../../api/Helpers';
import Spinner from '../Spinner';
import { track } from '../../mixpanel';

/**
 * Load Components
 */
// const MenuAccordion = lazy(() => import('../Restaurant/MenuAccordion'));

class RestaurantDetail extends Component {

    async componentDidMount() {
        const { appActions } = this.props;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        const dishId = this.props.match.params.dishId;
        const dishData = await appActions.getDishDetailInitialData(dishId);
        const restaurantId = this.props.location.pathname.split('/')[2];
        if (dishData.payload?.error) this.props.history.push(`/restaurant/${restaurantId}`);
    }

    async componentWillUnmount() {
        const { appActions } = this.props;
        await appActions.removeDishDetailInitialData();
    }

    render () {
        const { restaurantSettings, isScanned } = this.props;

        const categoryId = getParameterByName('category', this.props.location.search);
        const restaurantId = this.props.location.pathname.split('/')[2];
        const itemUrl = "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
        const dish =  this.props.restaurantDish;
        let dishImage = itemUrl;
        if (this.props.restaurantDishDataReady) {
            dishImage = dish.images.length > 0 ? dish.images[0].image_url : itemUrl;
            // Mixpanel track
            track('Dish-View', { event: 'Dish-View', itemId: dish.id, dish });
        }
        const imageStyle = {
            backgroundImage: `url('${dishImage}')`
        }

        return (
            <div>
                {!this.props.restaurantDishDataReady && <Spinner />}
                {this.props.restaurantDishDataReady &&
                    <div>
                        <div className="row pb-3 pt-1 m-0" style={{...restaurantSettings, width: "100%"}}>
                            <div>
                                <Link onClick={() => track('Restaurant clicked', { event: 'Restaurant clicked', itemId: restaurantId, data: { isScanned, categoryId } })} to={`/restaurant/${restaurantId}?scanned=${isScanned}&category=${categoryId}`} className="mb-0 btn btn-ligth button--back">
                                    <i style={{color: restaurantSettings.color}} className="fas fa-chevron-left"></i>
                                </Link>
                            </div>
                            <h3 className="text-center">{dish.name}</h3>
                        </div>
                        <div className="container px-0">
                            <div className="center-cropped" style={imageStyle}></div>
                            <p className="dish--description mt-3 text-center">{dish.description}</p>
                            <h3 className="text-center">${dish.price}</h3>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

RestaurantDetail.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDish: PropTypes.object,
    isScanned: PropTypes.bool,
    restaurantDishDataReady: PropTypes.bool,
    restaurantSettings: PropTypes.object.isRequired,
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object
};

const mapStateToProps = (state) => ({
    restaurantDish: state.app.restaurantDish,
    restaurantDishDataReady: state.app.restaurantDishDataReady,
    isScanned: state.app.isScanned,
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(RestaurantDetail));
