import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { track } from '../../mixpanel';

import Spinner from '../Spinner';
import MainModal from './MainModal';

const Dashboard = ({ restaurants, isRestaurantsDataReady }) => {
    const restaurantUrl = "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
    track('Restaurants-View')

    return (
        <div id="main-content" className="container px-0">
            <MainModal />
            {!isRestaurantsDataReady && <Spinner/>}
            <ul className="list-group mt-0">
                {
                    restaurants.map(restaurant => {
                        return (
                            <li className="list-group-item" key={restaurant.id}>
                                <Link to={`/restaurant/${restaurant.id}`} className="restaurant--card__item m-2" onClick={() => track('Restaurant clicked', { event: 'Restaurant clicked', itemId: restaurant.id, restaurant })}>
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="mb-2">{restaurant.name}</h5>
                                            <p className="mb-2 restaurant-dish__description">{restaurant.address}</p>
                                        </div>
                                        <div className="col-4">
                                            <img className="image--restaurant"
                                                src={`${restaurant.logo !== '' ? restaurant.logo_url : restaurantUrl }`} alt="image" srcSet=""/>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

Dashboard.propTypes = {
    restaurants: PropTypes.array.isRequired,
    isRestaurantsDataReady: PropTypes.bool.isRequired
};

export default Dashboard;
