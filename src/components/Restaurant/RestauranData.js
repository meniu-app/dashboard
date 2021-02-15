import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RestaurantData extends Component {
    
    render () {

        const {restaurant, restaurantSettings } = this.props;

        const restaurantUrl = "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&h=750&w=750";

        return (
            <div style={restaurantSettings}>
                {restaurant?.id &&
                    <div className="row py-4" style={{width: "100%"}}>
                        <div className="col-4 text-center">
                            <img className="image--restaurant-detail" src={`${restaurant.logo !== '' ? restaurant.logo_url : restaurantUrl }`} alt="image" srcSet=""/>
                        </div>
                        <div className="col-8">
                            <h3>{restaurant.name}</h3>
                            <p className="mb-2">{restaurant.address}</p>
                            <p>{restaurant.phone}</p>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

RestaurantData.propTypes = {
    restaurant: PropTypes.object.isRequired,
    restaurantSettings: PropTypes.object.isRequired,
    match: PropTypes.object
};

export default RestaurantData;
