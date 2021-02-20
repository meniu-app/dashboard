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
    APP_START,
    ADD_CATEGORY_DATA_SUCCESS,
    ADD_CATEGORY_DATA_ERROR,
    ADD_ITEM_DATA_SUCCESS,
    ADD_ITEM_DATA_ERROR,
    ADD_RESTAURANT_DATA_ERROR,
    ADD_RESTAURANT_DATA_SUCCESS,
    ADD_RESTAURANT_DATA,
    ALERT_ACTIVATE,
    ALERT_DEACTIVATE,
    ADD_ITEM_DATA,
    ADD_CATEGORY_DATA,
    ADD_MENU_DATA,
    ADD_MENU_DATA_SUCCESS,
    ADD_MENU_DATA_ERROR,
    ADD_USER_DATA,
    ADD_USER_DATA_SUCCESS,
    ADD_USER_DATA_ERROR,
} from './types';
import API from '../api/Api';
import {
    setAccessToken,
    setRefreshToken,
    setUser,
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
            setUser(data['authenticatedUser']);
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
 * Action which is callled when the app starts
 */
const appStartAction = () => ({
    type: 
    APP_START
});

/**
 * Function to fetch init data from Auth user
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const appStart = () => async (dispatch) => {
    return dispatch(appStartAction());
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
export const getRestaurantDetailInitialData = (id) => async (dispatch) => {
    dispatch(getRestaurantDetailInitialDataInitAction());
    try {
        const response = await API.getRestaurantDetail(id);
        const data = response['data'];
        return dispatch(getRestaurantDetailInitialDataSuccessAction({data}));
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

/**
 * Action to add new category
 */
const addCategoryDataInitAction = () => ({
    type: ADD_CATEGORY_DATA
});

/**
 * Action which is callled when the addCategoryDataInitAction success
 */
const addCategoyDataSuccessAction = (data) => ({
    type:ADD_CATEGORY_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the addCategoryDataInitAction failed
 */
const addcategoryDataErrorAction = (error) => ({
    type: ADD_CATEGORY_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from DIsh detail
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from dish
 */
export const addCategoryData = (data) => async (dispatch) => {
    dispatch(addCategoryDataInitAction());
    try {
        const response = await API.addCategory(data);
        const responseData = response['data'];
        dispatch(alertActivateAction({text: 'Category successfully added', alert: 'success'}));
        return dispatch(addCategoyDataSuccessAction(responseData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(addcategoryDataErrorAction({error: error}));
    }
}

/**
 * Action to add new item
 */
const addItemDataInitAction = () => ({
    type: ADD_ITEM_DATA
});

/**
 * Action which is callled when the addItemDataInitAction success
 */
const addItemDataSuccessAction = (data) => ({
    type: ADD_ITEM_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the addItemDataInitAction failed
 */
const addItemDataErrorAction = (error) => ({
    type: ADD_ITEM_DATA_ERROR,
    payload: error
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const addItemData = (data, imageData) => async (dispatch) => {
    dispatch(addItemDataInitAction());
    try {
        const response = await API.addItem(data);
        const responseData = response['data'];
        // Making image post after item is created
        imageData.append('item', responseData.id);
        await API.addImage(imageData);
        dispatch(alertActivateAction({text: 'Item successfully added', alert: 'success'}));
        return dispatch(addItemDataSuccessAction(responseData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(addItemDataErrorAction({error: error}));
    }
}

/**
 * Action to add new restaurant
 */
const addRestaurantDataInitAction = () => ({
    type: ADD_RESTAURANT_DATA
});

/**
 * Action which is callled when the addRestaurantDataInitAction success
 */
const addRestaurantDataSuccessAction = (data) => ({
    type: ADD_RESTAURANT_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the addItemDataInitAction failed
 */
const addRestaurantDataErrorAction = () => ({
    type: ADD_RESTAURANT_DATA_ERROR
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const addRestaurantData = (data) => async (dispatch) => {
    dispatch(addRestaurantDataInitAction());
    try {
        const response = await API.addRestaurant(data);
        const responseData = response['data'];
        dispatch(alertActivateAction({text: 'Restaurant successfully added', alert: 'success'}));
        return dispatch(addRestaurantDataSuccessAction(responseData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(addRestaurantDataErrorAction({error: error}));
    }
}

/**
 * Alert deactivate
 */
const alertDeactivateAction = () => ({
    type: ALERT_DEACTIVATE
});

/**
 * Alert activate
 */
const alertActivateAction = (data) => ({
    type: ALERT_ACTIVATE,
    payload: data
});

/**
 * Function to deactivate alert
 */
export const alertDeactivate = () => async (dispatch) => {
    dispatch(alertDeactivateAction())
}


/**
 * Action to add new menu
 */
const addMenuDataInitAction = () => ({
    type: ADD_MENU_DATA
});

/**
 * Action which is callled when the addMenuDataInitAction success
 */
const addMenuDataSuccessAction = (data) => ({
    type: ADD_MENU_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the addMenuDataInitAction failed
 */
const addMenuDataErrorAction = () => ({
    type: ADD_MENU_DATA_ERROR
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const addMenuData = (data) => async (dispatch) => {
    dispatch(addMenuDataInitAction());
    try {
        const response = await API.addMenu(data);
        const responseData = response['data'];
        dispatch(alertActivateAction({text: 'Menu successfully added', alert: 'success'}));
        return dispatch(addMenuDataSuccessAction(responseData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(addMenuDataErrorAction({error: error}));
    }
}

/**
 * Action to add new user
 */
const addUserDataInitAction = () => ({
    type: ADD_USER_DATA
});

/**
 * Action which is callled when the addUserDataInitAction success
 */
const addUserDataSuccessAction = (data) => ({
    type: ADD_USER_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the addUserDataInitAction failed
 */
const addUserDataErrorAction = () => ({
    type: ADD_USER_DATA_ERROR
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const addUserData = (data, role) => async (dispatch) => {
    dispatch(addUserDataInitAction());
    try {
        let response = undefined;
        if (role === '2')
            response = await API.addOwner(data);
        else
            response = await API.addBusinessManager(data);
        const responseData = response['data'];
        dispatch(alertActivateAction({text: 'User successfully added', alert: 'success'}));
        return dispatch(addUserDataSuccessAction(responseData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(addUserDataErrorAction({error: error}));
    }
}