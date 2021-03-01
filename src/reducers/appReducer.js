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
    EDIT_RESTAURANT_DATA,
    EDIT_RESTAURANT_DATA_SUCCESS,
    EDIT_RESTAURANT_DATA_ERROR,
    EDIT_ITEM_DATA,
    EDIT_ITEM_DATA_SUCCESS,
    EDIT_ITEM_DATA_ERROR,
    EDIT_CATEGORY_DATA,
    EDIT_CATEGORY_DATA_SUCCESS,
    EDIT_CATEGORY_DATA_ERROR,
    EDIT_MENU_DATA,
    EDIT_MENU_DATA_SUCCESS,
    EDIT_MENU_DATA_ERROR,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_ERROR,
    DELETE_MENU_DATA_ERROR,
    DELETE_MENU_DATA_SUCCESS,
    DELETE_MENU_DATA,
    DELETE_RESTAURANT_DATA,
    DELETE_RESTAURANT_DATA_SUCCESS,
    DELETE_RESTAURANT_DATA_ERROR,
    DELETE_ITEM_DATA_SUCCESS,
    DELETE_ITEM_DATA_ERROR,
    DELETE_ITEM_DATA,
    DELETE_CATEGORY_DATA,
    DELETE_CATEGORY_DATA_SUCCESS,
    DELETE_CATEGORY_DATA_ERROR,
    ADD_USER_DATA,
    ADD_USER_DATA_SUCCESS,
    ADD_USER_DATA_ERROR,
    ADD_RESTAURANT_DATA_OWNER_SUCCESS,
    DELETE_USER_DATA,
    DELETE_USER_DATA_SUCCESS,
    DELETE_USER_DATA_ERROR
} from '../actions/types';
import initialState from './initialState';

export default function(state = initialState.app, action) {
    switch (action.type) {
        case APP_START:
            return {
                ...state,
                appStarted: true
            };
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
            }
        case AUTHENTICATED_ERROR:
            return {
                ...state,
                isLoggedIn: false,
            }
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
        case ADD_RESTAURANT_DATA_OWNER_SUCCESS:
            return {
                ...state,
                formLoading: false,
                restaurantDetail: action.payload,
                restaurantDataReady: true
            }
        case ADD_RESTAURANT_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case EDIT_RESTAURANT_DATA:
            return {
                ...state,
                formLoading: true,
            }
        case EDIT_RESTAURANT_DATA_SUCCESS:
            var newRestaurants = state.restaurants;
            newRestaurants.splice(state.restaurants.findIndex(restaurant => (restaurant.id === action.payload.id)), 1, action.payload);
            return {
                ...state,
                formLoading: false,
                restaurantDetail: action.payload,
                restaurants: newRestaurants
            }
        case EDIT_RESTAURANT_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case DELETE_RESTAURANT_DATA:
            return {
                ...state,
                formLoading: true,
            }
        case DELETE_RESTAURANT_DATA_SUCCESS:
            newRestaurants = state.restaurants;
            newRestaurants.splice(state.restaurants.findIndex(restaurant => (restaurant.id === action.payload)), 1);
            return {
                ...state,
                formLoading: false,
                restaurantDetail: {},
                restaurantDataReady: false,
                restaurants: newRestaurants
            }
        case DELETE_RESTAURANT_DATA_ERROR:
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
                formLoading: false,
                menuDetail: action.payload.menuData
            }
        case ADD_ITEM_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case EDIT_ITEM_DATA:
            return {
                ...state,
                formLoading: true
            }
        case EDIT_ITEM_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false,
                menuDetail: action.payload.menuData
            }
        case EDIT_ITEM_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case DELETE_ITEM_DATA:
            return {
                ...state,
                formLoading: true
            }
        case DELETE_ITEM_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false,
                menuDetail: action.payload
            }
        case DELETE_ITEM_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case EDIT_CATEGORY_DATA:
            return {
                ...state,
                formLoading: true
            }
        case EDIT_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false,
                restaurantDetail: action.payload.restaurantData
            }
        case EDIT_CATEGORY_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case DELETE_CATEGORY_DATA:
            return {
                ...state,
                formLoading: true
            }
        case DELETE_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false,
                restaurantDetail: action.payload
            }
        case DELETE_CATEGORY_DATA_ERROR:
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
        case EDIT_MENU_DATA:
            return {
                ...state,
                formLoading: true
            }
        case EDIT_MENU_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false,
                restaurantDetail: action.payload.restaurantData,
                menuDetail: {
                    ...state.menuDetail,
                    name: action.payload.data.name,
                    description: action.payload.data.description
                }
            }
        case EDIT_MENU_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case DELETE_MENU_DATA:
            return {
                ...state,
                formLoading: true
            }
        case DELETE_MENU_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false,
                restaurantDetail: action.payload
            }
        case DELETE_MENU_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case ADD_USER_DATA:
            return {
                ...state,
                formLoading: true
            }
        case ADD_USER_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false
            }
        case ADD_USER_DATA_ERROR:
            return {
                ...state,
                formLoading: false
            }
        case DELETE_USER_DATA:
            return {
                ...state,
                formLoading: true
            }
        case DELETE_USER_DATA_SUCCESS:
            return {
                ...state,
                formLoading: false
            }
        case DELETE_USER_DATA_ERROR:
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