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
        case ADD_ITEM_DATA:
            return {
                ...state,
                formLoading: true
            }
        case ADD_ITEM_DATA_SUCCESS:
            var item = action.payload;
            var items = [];
            var newCategories = {...state.menuDetail.categories};
            var newMenuDetail = {...state.menuDetail};
            if (!newCategories[item.category]) {
                newCategories[item.category] = {
                    name: action.payload.categoryName,
                    items: [item]
                }
            } else {
                newCategories[item.category].items.push(item);
            }
            newMenuDetail.categories = newCategories;

            return {
                ...state,
                formLoading: false,
                menuDetail: {...newMenuDetail}
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
            item = action.payload;
            items = [...state.menuDetail.categories[item.category].items]
            items.splice(items.findIndex(i => (i.id === item.id)), 1, item);
            newCategories = {...state.menuDetail.categories}
            newCategories[item.category].items = items;
            newMenuDetail = {...state.menuDetail};
            newMenuDetail.categories = newCategories;

            return {
                ...state,
                formLoading: false,
                menuDetail: {...newMenuDetail}
            }
        case EDIT_ITEM_DATA_ERROR:
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