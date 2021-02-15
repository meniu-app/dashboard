import {
    GET_RESTAURANTS_INITIAL_DATA,
    GET_RESTAURANTS_INITIAL_DATA_SUCCESS,
    GET_RESTAURANTS_INITIAL_DATA_ERROR,
    POST_LOGIN,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR,
    POST_LOGOUT,
    GET_RESTAURANT_DETAIL_INITIAL_DATA,
    GET_RESTAURANT_DETAIL_INITIAL_DATA_SUCCESS,
    GET_RESTAURANT_DETAIL_INITIAL_DATA_ERROR,
    GET_DISH_DETAIL_INITIAL_DATA,
    GET_DISH_DETAIL_INITIAL_DATA_SUCCESS,
    GET_DISH_DETAIL_INITIAL_DATA_ERROR,
    GET_MENU_DETAIL_INITIAL_DATA,
    GET_MENU_DETAIL_INITIAL_DATA_SUCCESS,
    GET_MENU_DETAIL_INITIAL_DATA_ERROR,
} from '../actions/types';
import initialState from './initialState';

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_RESTAURANTS_INITIAL_DATA:
            return {
                ...state,
                restaurants: []
            };
        case GET_RESTAURANTS_INITIAL_DATA_SUCCESS:
            return {
                ...state,
                restaurants: action.payload,
                isRestaurantsDataReady: true,
            };
        case GET_RESTAURANTS_INITIAL_DATA_ERROR:
            return {
                ...state,
                restaurants: [],
                isRestaurantsDataReady: true,
            };
        case GET_RESTAURANT_DETAIL_INITIAL_DATA:
            return {
                ...state,
                restaurantDataReady: false,
                restaurant: {}
            };
        case GET_RESTAURANT_DETAIL_INITIAL_DATA_SUCCESS:
            return {
                ...state,
                restaurant: action.payload.data,
                isScanned: action.payload.isScanned,
                restaurantDataReady: true
            };
        case GET_RESTAURANT_DETAIL_INITIAL_DATA_ERROR:
            return {
                ...state,
                restaurant: {},
                restaurantDataReady: false,
            };
        case GET_MENU_DETAIL_INITIAL_DATA:
            return {
                ...state,
                restaurantMenus: {id: 1},
                restaurantMenusDataReady: false,
            };
        case GET_MENU_DETAIL_INITIAL_DATA_SUCCESS:
            return {
                ...state,
                restaurantMenus: action.payload,
                restaurantMenusDataReady: true
            };
        case GET_MENU_DETAIL_INITIAL_DATA_ERROR:
            return {
                ...state,
                restaurantMenus: {},
                restaurantMenusDataReady: false,
            };
        case GET_DISH_DETAIL_INITIAL_DATA:
            return {
                ...state,
                restaurantDish: {},
                restaurantDishDataReady: false
            };
        case GET_DISH_DETAIL_INITIAL_DATA_SUCCESS:
            return {
                ...state,
                restaurantDish: action.payload,
                restaurantDishDataReady: true
            };
        case GET_DISH_DETAIL_INITIAL_DATA_ERROR:
            return {
                ...state,
                restaurantDish: {},
                restaurantDishDataReady: false,
            };
        case POST_LOGIN:
            return {
                ...state
            };
        case POST_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            };
        case POST_LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false
            };
        case POST_LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
        default:
            return state;
    }
}