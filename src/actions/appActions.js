import {
    GET_RESTAURANTS_INITIAL_DATA,
    GET_RESTAURANTS_INITIAL_DATA_SUCCESS,
    GET_RESTAURANTS_INITIAL_DATA_ERROR,
    POST_LOGIN,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR,
    GET_RESTAURANT_DETAIL_INITIAL_DATA,
    GET_RESTAURANT_DETAIL_INITIAL_DATA_SUCCESS,
    GET_RESTAURANT_DETAIL_INITIAL_DATA_ERROR,
    POST_LOGOUT,
    GET_DISH_DETAIL_INITIAL_DATA,
    GET_DISH_DETAIL_INITIAL_DATA_SUCCESS,
    GET_DISH_DETAIL_INITIAL_DATA_ERROR,
    GET_MENU_DETAIL_INITIAL_DATA,
    GET_MENU_DETAIL_INITIAL_DATA_SUCCESS,
    GET_MENU_DETAIL_INITIAL_DATA_ERROR,
} from './types';
import API from '../api/Api';
import {
    setAccessToken,
    setRefreshToken,
} from '../api/TokenHandler';

/**
 * Action to initialize the Restaurants
 */
const getRestaurantsInitialDataInitAction = () => ({
    type: GET_RESTAURANTS_INITIAL_DATA
});

/**
 * Action which is callled when the getRestaurantsInitialDataInitAction success
 */
const getRestaurantsInitialDataSuccessAction = (data) => ({
    type: GET_RESTAURANTS_INITIAL_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the getRestaurantsInitialDataInitAction failed
 */
const getRestaurantsInitialDataErrorAction = (error) => ({
    type: GET_RESTAURANTS_INITIAL_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from Restaurants
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const getRestaurantInitialData = () => async (dispatch) => {
    dispatch(getRestaurantsInitialDataInitAction());
    try {
        const response = await API.getRestaurants();
        
        const data = response['data'];
        return dispatch(getRestaurantsInitialDataSuccessAction(data));
    } catch (error) {
        return dispatch(getRestaurantsInitialDataErrorAction(`Error: ${error}`));
    }
}

/**
 * Action to initialize the Auth user
 */
const postLoginInitAction = () => ({
    type: POST_LOGIN
});

/**
 * Action which is callled when the getAuthUserDataInitAction success
 */
const postLoginInitSuccessAction = (data) => ({
    type: POST_LOGIN_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the getAuthUserDataInitAction failed
 */
const postLoginInitErrorAction = (error) => ({
    type: POST_LOGIN_ERROR,
    payload: error
});

/**
 * Function to fetch init data from Auth user
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const postLoginData = (email, password) => async (dispatch) => {
    dispatch(postLoginInitAction());
    try {
        const response = await API.login({'email': email, 'password': password});
        const data = response['data'];
        if (data) {
            setAccessToken(data['access']);
            setRefreshToken(data['refresh']);
            return dispatch(postLoginInitSuccessAction(data));
        }
        return dispatch(postLoginInitErrorAction(`Error: Bad credentials`));
    } catch (error) {
        return dispatch(postLoginInitErrorAction(`Error: ${error}`));
    }
}

/**
 * Action which is callled when the user logout
 */
const postLogoutAction = () => ({
    type: 
    POST_LOGOUT
});

/**
 * Function to fetch init data from Auth user
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const postLogout = () => async (dispatch) => {
    return dispatch(postLogoutAction());
}

/**
 * Action to get restaurant details
 */
const getRestaurantDetailInitialDataInitAction = () => ({
    type: GET_RESTAURANT_DETAIL_INITIAL_DATA
});

/**
 * Action which is callled when the getRestaurantDetailInitialDataInitAction success
 */
const getRestaurantDetailInitialDataSuccessAction = (data) => ({
    type: GET_RESTAURANT_DETAIL_INITIAL_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the getRestaurantDetailInitialDataInitAction failed
 */
const getRestaurantDetailInitialDataErrorAction = (error) => ({
    type: GET_RESTAURANT_DETAIL_INITIAL_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from Restaurants
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const getRestaurantDetailInitialData = (id, isScanned) => async (dispatch) => {
    dispatch(getRestaurantDetailInitialDataInitAction());
    try {
        const response = await API.getRestaurantDetail(id);
        const data = response['data'];
        return dispatch(getRestaurantDetailInitialDataSuccessAction({data, isScanned}));
    } catch (error) {
        return dispatch(getRestaurantDetailInitialDataErrorAction({error: error}));
    }
}

/**
 * Function to remove init data from Restaurants
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const removeRestaurantDetailInitialData = () => async (dispatch) => {
    dispatch(getRestaurantDetailInitialDataInitAction());
}

/**
 * Action to get dish details
 */
const getDishDetailInitialDataInitAction = () => ({
    type: GET_DISH_DETAIL_INITIAL_DATA
});

/**
 * Action which is callled when the getDishDetailInitialDataInitAction success
 */
const getDishDetailInitialDataSuccessAction = (data) => ({
    type: GET_DISH_DETAIL_INITIAL_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the getDishDetailInitialDataInitAction failed
 */
const getDishDetailInitialDataErrorAction = (error) => ({
    type: GET_DISH_DETAIL_INITIAL_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from DIsh detail
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from dish
 */
export const getDishDetailInitialData = (id) => async (dispatch) => {
    dispatch(getDishDetailInitialDataInitAction());
    try {
        const response = await API.getDishDetail(id);
        const data = response['data'];
        return dispatch(getDishDetailInitialDataSuccessAction(data));
    } catch (error) {
        return dispatch(getDishDetailInitialDataErrorAction({error: error}));
    }
}

/**
 * Function to remove init data from DIsh detail
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from dish
 */
export const removeDishDetailInitialData = () => async (dispatch) => {
    return (dispatch(getDishDetailInitialDataInitAction()));
}

/**
 * Action to get menu details
 */
const getMenuDetailInitialDataInitAction = () => ({
    type: GET_MENU_DETAIL_INITIAL_DATA
});

/**
 * Action which is callled when the getMenuDetailInitialDataInitAction success
 */
const getMenuDetailInitialDataSuccessAction = (data) => ({
    type: GET_MENU_DETAIL_INITIAL_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the getMenuDetailInitialDataInitAction failed
 */
const getMenuDetailInitialDataErrorAction = (error) => ({
    type: GET_MENU_DETAIL_INITIAL_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from Menus
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from Menus
 */
export const getMenuDetailInitialData = (id) => async (dispatch) => {
    dispatch(getMenuDetailInitialDataInitAction());
    try {
        const response = await API.getMenuDetail(id);
        const data = response['data'];
        return dispatch(getMenuDetailInitialDataSuccessAction(data));
    } catch (error) {
        return dispatch(getMenuDetailInitialDataErrorAction({error: error}));
    }
}

/**
 * Function to remove init data from Menu
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from menu
 */
export const removemenuDetailInitialData = () => async (dispatch) => {
    dispatch(getMenuDetailInitialDataInitAction());
}