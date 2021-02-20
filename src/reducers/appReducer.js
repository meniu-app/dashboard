import {
    APP_START,
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
    GET_MENU_DETAIL_INITIAL_DATA,
    GET_MENU_DETAIL_INITIAL_DATA_SUCCESS,
    GET_MENU_DETAIL_INITIAL_DATA_ERROR,
    ADD_RESTAURANT_DATA,
    ADD_RESTAURANT_DATA_SUCCESS,
    ADD_RESTAURANT_DATA_ERROR,
    ALERT_DEACTIVATE,
    ALERT_ACTIVATE,
    ADD_ITEM_DATA,
    ADD_ITEM_DATA_SUCCESS,
    ADD_ITEM_DATA_ERROR,
    ADD_CATEGORY_DATA,
    ADD_CATEGORY_DATA_SUCCESS,
    ADD_CATEGORY_DATA_ERROR,
    ADD_MENU_DATA,
    ADD_MENU_DATA_SUCCESS,
    ADD_MENU_DATA_ERROR,
} from '../actions/types';
import initialState from './initialState';

export default function(state = initialState.app, action) {
    switch (action.type) {
        case APP_START:
            return {
                ...state,
                appStarted: true
            };
        case GET_RESTAURANTS_INITIAL_DATA:
            return {
                ...state,
                restaurants: [],
                restaurantsDataReady: false
            };
        case GET_RESTAURANTS_INITIAL_DATA_SUCCESS:
            return {
                ...state,
                restaurants: action.payload,
                restaurantsDataReady: true
            };
        case GET_RESTAURANTS_INITIAL_DATA_ERROR:
            return {
                ...state,
                restaurants: [],
                restaurantsDataReady: true,
            };
        case GET_RESTAURANT_DETAIL_INITIAL_DATA:
            return {
                ...state,
                restaurantDataReady: false,
                restaurantDetail: {}
            };
        case GET_RESTAURANT_DETAIL_INITIAL_DATA_SUCCESS:
            return {
                ...state,
                restaurantDetail: action.payload.data,
                isLoggedIn: true,
                restaurantDataReady: true,
                menuDetail: {},
                menuDetailDataReady: false,
            };
        case GET_RESTAURANT_DETAIL_INITIAL_DATA_ERROR:
            return {
                ...state,
                restaurantDetail: {},
                restaurantDataReady: false,
                menuDetail: {},
                menuDetailDataReady: false,
            };
        case GET_MENU_DETAIL_INITIAL_DATA:
            return {
                ...state,
                menuDetail: {},
                menuDetailDataReady: false,
            };
        case GET_MENU_DETAIL_INITIAL_DATA_SUCCESS:
            return {
                ...state,
                menuDetail: action.payload,
                menuDetailDataReady: true
            };
        case GET_MENU_DETAIL_INITIAL_DATA_ERROR:
            return {
                ...state,
                menuDetail: {},
                menuDetailDataReady: false,
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
                ...initialState.app,
                appStarted: true
            };
        case ADD_RESTAURANT_DATA:
            return {
                ...state,
                formLoading: true,
            }
        case ADD_RESTAURANT_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false,
                restaurants: state.restaurants.concat(action.payload)
            }
        case ADD_RESTAURANT_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case ADD_ITEM_DATA:
            return {
                ...state,
                formLoading: true
            }
        case ADD_ITEM_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false
            }
        case ADD_ITEM_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case ADD_CATEGORY_DATA:
            return {
                ...state,
                formLoading: true
            }
        case ADD_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false,
                restaurantDetail: {
                    ...state.restaurantDetail,
                    categories: state.restaurantDetail.categories.concat(action.payload)
                }
            }
        case ADD_CATEGORY_DATA_ERROR:
            return {
                ...state,
                formLoading: false
                }
        case ADD_MENU_DATA:
            return {
                ...state,
                formLoading: true
            }
        case ADD_MENU_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false,
                restaurantDetail: {
                    ...state.restaurantDetail,
                    menus: state.restaurantDetail.menus.concat(action.payload)
                }
            }
        case ADD_MENU_DATA_ERROR:
            return {
                ...state,
                formLoading: false
                }
        case ALERT_ACTIVATE:
            return {
                ...state,
                message: action.payload
            }
        case ALERT_DEACTIVATE:
            return {
                ...state,
                message: {
                    text: '',
                    alert: ''
                }
            }
        default:
            return state;
    }
}