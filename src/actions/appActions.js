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
    GET_RESTAURANT_TREE_VIEW_DETAIL_DATA,
    GET_RESTAURANT_TREE_VIEW_DETAIL_DATA_SUCCESS,
    GET_RESTAURANT_TREE_VIEW_DETAIL_DATA_ERROR,
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
    EDIT_ITEM_DATA,
    EDIT_ITEM_DATA_SUCCESS,
    EDIT_ITEM_DATA_ERROR,
    EDIT_RESTAURANT_DATA_SUCCESS,
    EDIT_RESTAURANT_DATA_ERROR,
    EDIT_RESTAURANT_DATA,
    EDIT_CATEGORY_DATA,
    EDIT_CATEGORY_DATA_SUCCESS,
    EDIT_CATEGORY_DATA_ERROR,
    EDIT_MENU_DATA,
    EDIT_MENU_DATA_SUCCESS,
    EDIT_MENU_DATA_ERROR,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_ERROR,
    DELETE_MENU_DATA_SUCCESS,
    DELETE_MENU_DATA_ERROR,
    DELETE_RESTAURANT_DATA,
    DELETE_RESTAURANT_DATA_SUCCESS,
    DELETE_RESTAURANT_DATA_ERROR,
    DELETE_ITEM_DATA,
    DELETE_CATEGORY_DATA_ERROR,
    DELETE_CATEGORY_DATA_SUCCESS,
    DELETE_CATEGORY_DATA,
    ADD_RESTAURANT_DATA_OWNER_SUCCESS,
    DELETE_USER_DATA,
    DELETE_USER_DATA_SUCCESS,
    DELETE_USER_DATA_ERROR,
    DELETE_ITEM_DATA_SUCCESS,
    DELETE_ITEM_DATA_ERROR,
    DELETE_MENU_DATA,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_CONFIRM,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_ERROR,
    EDIT_USER_DATA,
    EDIT_USER_DATA_SUCCESS,
    EDIT_USER_DATA_ERROR,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR,
    REMOVE_IMAGE_DATA,
    REMOVE_IMAGE_DATA_SUCCESS
} from './types';
import API from '../api/Api';
import {
    getUser,
    removeTokens,
    removeUser,
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
            dispatch(alertActivateAction({text: 'successfully logged in', alert: 'success'}));
            return dispatch(postLoginInitSuccessAction(data));
        }
        return dispatch(postLoginInitErrorAction(`Error: Bad credentials`));
    } catch (error) {
        dispatch(alertActivateAction({text: 'Incorrect email or password', alert: 'danger'}));
        return dispatch(postLoginInitErrorAction(`Error: ${error}`));
    }
}

/**
 * Action to reset password
 */
const resetPasswordInitAction = () => ({
    type: RESET_PASSWORD
});

/**
 * Action which is callled when the resetPasswordInitAction success
 */
const resetPasswordInitSuccessAction = (data) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the resetPasswordInitAction failed
 */
const resetPasswordInitErrorAction = (error) => ({
    type: RESET_PASSWORD_ERROR,
    payload: error
});

/**
 * Function to fetch init data from Auth user
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const resetPasswordData = (email) => async (dispatch) => {
    dispatch(resetPasswordInitAction());
    try {
        const response = await API.resetPassword({'email': email});
        const data = response['data'];
        dispatch(alertActivateAction({text: 'Please check your email', alert: 'success'}));
        return dispatch(resetPasswordInitSuccessAction(data));
    } catch (error) {
        dispatch(alertActivateAction({text: 'Incorrect email', alert: 'danger'}));
        return dispatch(resetPasswordInitErrorAction(`Error: ${error}`));
    }
}


/**
 * Action to reset password cnfirm
 */
const resetPasswordConfirmInitAction = () => ({
    type: RESET_PASSWORD_CONFIRM
});

/**
 * Action which is callled when the resetPasswordConfirmInitAction success
 */
const resetPasswordConfirmInitSuccessAction = (data) => ({
    type: RESET_PASSWORD_CONFIRM_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the resetPasswordConfirmInitAction failed
 */
const resetPasswordConfirmInitErrorAction = (error) => ({
    type: RESET_PASSWORD_CONFIRM_ERROR,
    payload: error
});

/**
 * Function to fetch init data from Auth user
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const resetPasswordConfirmData = (password, token) => async (dispatch) => {
    dispatch(resetPasswordConfirmInitAction());
    try {
        const response = await API.resetPasswordConfirm({password, token});
        const data = response['data'];
        dispatch(alertActivateAction({text: 'Password succesfully updated', alert: 'success'}));
        return dispatch(resetPasswordConfirmInitSuccessAction(data));
    } catch (error) {
        if (error.response.data?.email) {
            dispatch(alertActivateAction({text: 'Please create a strong password', alert: 'danger'}));
        } else {
            dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        }
        return dispatch(resetPasswordConfirmInitErrorAction(`Error: ${error}`));
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
 * Action to get restaurant tree view details
 */
const getRestaurantTreeViewDetailDataAction = () => ({
    type: GET_RESTAURANT_TREE_VIEW_DETAIL_DATA
});

/**
 * Action which is called when the getRestaurantTreeViewDetailDataAction success
 */
const getRestaurantTreeViewDetailDataSuccessAction = (data) => ({
    type: GET_RESTAURANT_TREE_VIEW_DETAIL_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is called when the getRestaurantTreeViewDetailDataAction failed
 */
const getRestaurantTreeViewDetailDataErrorAction = (error) => ({
    type: GET_RESTAURANT_TREE_VIEW_DETAIL_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from Restaurants
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const getRestaurantDetailInitialData = (id, userId) => async (dispatch) => {
    dispatch(getRestaurantDetailInitialDataInitAction());
    try {
        let response = null;
        if (userId)
            response = await API.getRestaurantDetailByUser(userId);
        else
            response = await API.getRestaurantDetail(id);
        const data = response['data'];
        return dispatch(getRestaurantDetailInitialDataSuccessAction({data}));
    } catch (error) {
        return dispatch(getRestaurantDetailInitialDataErrorAction({error: error}));
    }
}

/**
 * Function to fetch init data from Restaurants
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const setRestaurantDetailInitialData = (restaurant) => async (dispatch) => {
    return dispatch(getRestaurantDetailInitialDataSuccessAction({restaurant}));
}

/**
 * Function to fetch Restaurants tree view data
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains tree view data from restaurants
 */
export const getRestaurantTreeViewDetailData = () => async (dispatch) => {
    dispatch(getRestaurantTreeViewDetailDataAction());
    try {
        let response = await API.getRestaurantTreeViewDetails();
        const data = response['data'];
        return dispatch(getRestaurantTreeViewDetailDataSuccessAction({data}));
    } catch (error) {
        return dispatch(getRestaurantTreeViewDetailDataErrorAction({error: error}));
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
const getMenuDetailInitialDataErrorAction = () => ({
    type: GET_MENU_DETAIL_INITIAL_DATA_ERROR
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
        return dispatch(getMenuDetailInitialDataErrorAction());
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
const addItemDataSuccessAction = (data, menuData) => ({
    type: ADD_ITEM_DATA_SUCCESS,
    payload: {data, menuData}
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
export const addItemData = (data, imageData, menuId) => async (dispatch) => {
    dispatch(addItemDataInitAction());
    try {
        const response = await API.addItem(data);
        const responseData = response['data'];
        // Making image post after item is created
        imageData.append('item', responseData.id);
        await API.addImage(imageData);
        dispatch(alertActivateAction({text: 'Item successfully added', alert: 'success'}));
        const menu = await API.getMenuDetail(menuId);
        const menuData = menu['data'];
        return dispatch(addItemDataSuccessAction(responseData, menuData));
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
 * Action which is callled when the addRestaurantDataInitAction success
 */
const addRestaurantDataOwnerSuccessAction = (data) => ({
    type: ADD_RESTAURANT_DATA_OWNER_SUCCESS,
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
export const addRestaurantData = (data, hasNoRestaurant) => async (dispatch) => {
    dispatch(addRestaurantDataInitAction());
    try {
        const response = await API.addRestaurant(data);
        const responseData = response['data'];

        if (hasNoRestaurant) {
            const user = getUser();
            const data = {
                restaurant: responseData['id']
            }
            await API.editOwner(data, user.id);
            user.restaurant = data.restaurant;
            setUser(user);
            dispatch(alertActivateAction({text: 'Restaurant successfully added', alert: 'success'}));
            return dispatch(addRestaurantDataOwnerSuccessAction(responseData));
        }
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

        if (responseData.restaurant !== null && responseData.restaurant !== undefined) {
            const restaurant = await API.getRestaurantDetail(responseData.restaurant);
            const restaurantData = restaurant['data'];
            dispatch(addRestaurantDataOwnerSuccessAction(restaurantData));
        }

        dispatch(alertActivateAction({text: 'User successfully added', alert: 'success'}));
        return dispatch(addUserDataSuccessAction(responseData));
    } catch (error) {
        if (error.response.data.email) {
            dispatch(alertActivateAction({text: error.response.data.email, alert: 'danger'}));
        } else
            dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(addUserDataErrorAction({error: error}));
    }
}

/**
 * Action to edit new item
 */
const editItemDataInitAction = () => ({
    type: EDIT_ITEM_DATA
});

/**
 * Action which is callled when the editItemDataInitAction success
 */
const editItemDataSuccessAction = (data, menuData, restaurantData) => ({
    type: EDIT_ITEM_DATA_SUCCESS,
    payload: {data, menuData, restaurantData}
});

/**
 * Action which is callled when the editItemDataInitAction failed
 */
const editItemDataErrorAction = (error) => ({
    type: EDIT_ITEM_DATA_ERROR,
    payload: error
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const editItemData = (data, imageData, id, imageId, imageRemoved) => async (dispatch) => {
    dispatch(editItemDataInitAction());
    try {
        const response = await API.editItem(data, id);
        const responseData = response['data'];
        // Making image update after item is created
        if (imageId !== null && !imageRemoved) {
            await API.editImage(imageData, imageId);
        }
        if (imageId === null || (imageData.get('image').name !== '' && imageRemoved)) {
            imageData.append('item', id)
            imageData.append('approved', true)
            imageData.append('active', true)
            await API.addImage(imageData)
        }

        const menu = await API.getMenuDetail(responseData.menu);
        const menuData = menu['data'];

        const restaurantDetail = await API.getRestaurantDetail(menuData.restaurant);
        const restaurantData = restaurantDetail['data'];

        dispatch(alertActivateAction({text: 'Item successfully edited', alert: 'success'}));
        return dispatch(editItemDataSuccessAction(responseData, menuData, restaurantData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(editItemDataErrorAction({error: error}));
    }
}

/**
 * Action to edit restaurant
 */
const editRestaurantDataInitAction = () => ({
    type: EDIT_RESTAURANT_DATA
});

/**
 * Action which is callled when the addRestaurantDataInitAction success
 */
const editRestaurantDataSuccessAction = (data) => ({
    type: EDIT_RESTAURANT_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the addItemDataInitAction failed
 */
const editRestaurantDataErrorAction = () => ({
    type: EDIT_RESTAURANT_DATA_ERROR
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const editRestaurantData = (data, id) => async (dispatch) => {
    dispatch(editRestaurantDataInitAction());
    try {
        const response = await API.editRestaurant(data, id);
        const responseData = response['data'];
        dispatch(alertActivateAction({text: 'Restaurant successfully edited', alert: 'success'}));
        return dispatch(editRestaurantDataSuccessAction(responseData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(editRestaurantDataErrorAction({error: error}));
    }
}

/**
 * Action to edit category
 */
const editCategoryDataInitAction = () => ({
    type: EDIT_CATEGORY_DATA
});

/**
 * Action which is callled when the editCategoryDataInitAction success
 */
const editCategoyDataSuccessAction = (data, restaurantData) => ({
    type: EDIT_CATEGORY_DATA_SUCCESS,
    payload: {data, restaurantData}
});

/**
 * Action which is callled when the editCategoryDataInitAction failed
 */
const editCategoryDataErrorAction = (error) => ({
    type: EDIT_CATEGORY_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from DIsh detail
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from dish
 */
export const editCategoryData = (data, id) => async (dispatch) => {
    dispatch(editCategoryDataInitAction());
    try {
        const response = await API.editCategory(data, id);
        const responseData = response['data'];
        const restaurant = await API.getRestaurantDetail(responseData.restaurant);
        const restaurantData = restaurant['data'];
        dispatch(alertActivateAction({text: 'Category successfully edited', alert: 'success'}));
        return dispatch(editCategoyDataSuccessAction(responseData, restaurantData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(editCategoryDataErrorAction({error: error}));
    }
}

/**
 * Action to edit menu
 */
const editMenuDataInitAction = () => ({
    type: EDIT_MENU_DATA
});

/**
 * Action which is callled when the editMenuDataInitAction success
 */
const editMenuDataSuccessAction = (data, restaurantData) => ({
    type: EDIT_MENU_DATA_SUCCESS,
    payload: {data, restaurantData}
});

/**
 * Action which is callled when the editMenuDataInitAction failed
 */
const editMenuDataErrorAction = (error) => ({
    type: EDIT_MENU_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from DIsh detail
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from dish
 */
export const editMenuData = (data, id) => async (dispatch) => {
    dispatch(editMenuDataInitAction());
    try {
        const response = await API.editMenu(data, id);
        const responseData = response['data'];
        const restaurant = await API.getRestaurantDetail(responseData.restaurant);
        const restaurantData = restaurant['data'];
        dispatch(alertActivateAction({text: 'Menu successfully edited', alert: 'success'}));
        return dispatch(editMenuDataSuccessAction(responseData, restaurantData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(editMenuDataErrorAction({error: error}));
    }
}

/**
 * Action which is callled when the isAuthenticatedInitAction success
 */
const isAuthenticatedInitSuccessAction = (data) => ({
    type: AUTHENTICATED_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the isAuthenticatedInitAction failed
 */
const isAuthenticatedInitErrorAction = (error) => ({
    type: AUTHENTICATED_ERROR,
    payload: error
});

/**
 * Function to fetch init data from Auth user
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const isAuthenticatedData = () => async (dispatch) => {
    dispatch(postLoginInitAction());
    try {
        await API.isAuthenticated();
        return dispatch(isAuthenticatedInitSuccessAction());
    } catch (error) {
        dispatch(alertActivateAction({text: 'Your session expired', alert: 'danger'}));
        removeUser();
        removeTokens();
        return dispatch(isAuthenticatedInitErrorAction());
    }
}

/**
 * Action which is callled when deleteMenuDataAction
 */
const deleteMenuDataAction = (restaurantData) => ({
    type: DELETE_MENU_DATA,
    payload: restaurantData
});

/**
 * Action which is callled when the deleteMenuDataAction success
 */
const deleteMenuDataSuccessAction = (restaurantData) => ({
    type: DELETE_MENU_DATA_SUCCESS,
    payload: restaurantData
});

/**
 * Action which is callled when the deleteMenuDataAction failed
 */
const deleteMenuDataErrorAction = (error) => ({
    type: DELETE_MENU_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from DIsh detail
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from dish
 */
export const deleteMenuData = (menuId, restaurantId) => async (dispatch) => {
    dispatch(deleteMenuDataAction())
    try {
        await API.deleteMenu(menuId);
        const restaurant = await API.getRestaurantDetail(restaurantId);
        const restaurantData = restaurant['data'];
        dispatch(alertActivateAction({text: 'Menu successfully deleted', alert: 'success'}));
        return dispatch(deleteMenuDataSuccessAction(restaurantData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(deleteMenuDataErrorAction({error: error}));
    }
}

/**
 * Action to delete restaurant
 */
const deleteRestaurantDataInitAction = () => ({
    type: DELETE_RESTAURANT_DATA
});

/**
 * Action which is callled when the deleteRestaurantDataInitAction success
 */
const deleteRestaurantDataSuccessAction = (id) => ({
    type: DELETE_RESTAURANT_DATA_SUCCESS,
    payload: id
});

/**
 * Action which is callled when the addItemDataInitAction failed
 */
const deleteRestaurantDataErrorAction = () => ({
    type: DELETE_RESTAURANT_DATA_ERROR
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const deleteRestaurantData = (id) => async (dispatch) => {
    dispatch(deleteRestaurantDataInitAction());
    try {
        await API.deleteRestaurant(id);
        dispatch(alertActivateAction({text: 'Restaurant successfully deleted', alert: 'success'}));
        const user = getUser();
        if (user.role === 'owner') {
            user.restaurant = null;
            setUser(user);
        }
        return dispatch(deleteRestaurantDataSuccessAction(id));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(deleteRestaurantDataErrorAction({error: error}));
    }
}

/**
 * Action to delete restaurant
 */
const deleteItemDataInitAction = () => ({
    type: DELETE_ITEM_DATA
});


/**
 * Action which is callled when the deleteItemDataInitAction success
 */
const deleteItemDataSuccessAction = (menuData, restaurantData) => ({
    type: DELETE_ITEM_DATA_SUCCESS,
    payload: {menuData, restaurantData}
});

/**
 * Action which is callled when the deleteItemDataInitAction failed
 */
const deleteItemDataErrorAction = (error) => ({
    type: DELETE_ITEM_DATA_ERROR,
    payload: error
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const deleteItemData = (itemId, menuId) => async (dispatch) => {
    dispatch(deleteItemDataInitAction());
    try {
        await API.deleteItem(itemId);
        const menu = await API.getMenuDetail(menuId);
        const menuData = menu['data'];

        const restaurantDetail = await API.getRestaurantDetail(menuData.restaurant);
        const restaurantData = restaurantDetail['data'];

        dispatch(alertActivateAction({text: 'Item successfully deleted', alert: 'success'}));
        return dispatch(deleteItemDataSuccessAction(menuData, restaurantData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(deleteItemDataErrorAction({error}));
    }
}


/**
 * Action to delete category
 */
const deleteCategoryDataInitAction = () => ({
    type: DELETE_CATEGORY_DATA
});

/**
 * Action which is callled when the deleteCategoryDataInitAction success
 */
const deleteCategoyDataSuccessAction = (restaurantData, menuData) => ({
    type: DELETE_CATEGORY_DATA_SUCCESS,
    payload: {restaurantData, menuData}
});

/**
 * Action which is callled when the editCategoryDataInitAction failed
 */
const deleteCategoryDataErrorAction = (error) => ({
    type: DELETE_CATEGORY_DATA_ERROR,
    payload: error
});

/**
 * Function to fetch init data from DIsh detail
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from dish
 */
export const deleteCategoryData = (id, restaurantId, menuId) => async (dispatch) => {
    dispatch(deleteCategoryDataInitAction());
    try {
        await API.deleteCategory(id);
        const restaurant = await API.getRestaurantDetail(restaurantId);
        const restaurantData = restaurant['data'];

        let menuData = null;

        if (menuId !== undefined) {
            const menu = await API.getMenuDetail(menuId);
            menuData = menu['data'];
        }

        dispatch(alertActivateAction({text: 'Category successfully deleted', alert: 'success'}));
        return dispatch(deleteCategoyDataSuccessAction(restaurantData, menuData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(deleteCategoryDataErrorAction({error: error}));
    }
}

/**
 * Action to add new user
 */
const deleteUserDataInitAction = () => ({
    type: DELETE_USER_DATA
});

/**
 * Action which is callled when the deleteUserDataInitAction success
 */
const deleteUserDataSuccessAction = (data) => ({
    type: DELETE_USER_DATA_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the deleteUserDataInitAction failed
 */
const deleteUserDataErrorAction = () => ({
    type: DELETE_USER_DATA_ERROR
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const deleteUserData = (userId, restaurantId, userRole) => async (dispatch) => {
    dispatch(deleteUserDataInitAction());
    try {
        let response = undefined;
        // if (userRole === '2')
        response = await API.deleteOwner(userId);
        // else
        // response = await API.deleteBusinessManager(userId);
        const responseData = response['data'];

        const restaurant = await API.getRestaurantDetail(restaurantId);
        const restaurantData = restaurant['data'];
        dispatch(addRestaurantDataOwnerSuccessAction(restaurantData, userRole));

        dispatch(alertActivateAction({text: 'User successfully deleted', alert: 'success'}));
        return dispatch(deleteUserDataSuccessAction(responseData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(deleteUserDataErrorAction({error: error}));
    }
}

/**
 * Edit user
 */
const editUserDataAction = (data) => ({
    type: EDIT_USER_DATA,
    payload: data
});

/**
 * Action which is callled when the editUserDataAction success
 */
const editUserDataSuccessAction = (data, menuData, restaurantData) => ({
    type: EDIT_USER_DATA_SUCCESS,
    payload: {data, menuData, restaurantData}
});

/**
 * Action which is callled when the editUserDataAction failed
 */
const editUserDataErrorAction = (error) => ({
    type: EDIT_USER_DATA_ERROR,
    payload: error
});

/**
 * Function to add data to Item
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const editUserData = (data, id) => async (dispatch) => {
    dispatch(editUserDataAction());
    try {
        const response = await API.editOwner(data, id);
        const responseData = response['data'];
        dispatch(alertActivateAction({text: 'User successfully edited', alert: 'success'}));
        return dispatch(editUserDataSuccessAction(responseData));
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(editUserDataErrorAction({error: error}));
    }
}

/**
 * Action to reset password cnfirm
 */
const changePasswordInitAction = () => ({
    type: CHANGE_PASSWORD
});

/**
 * Action which is callled when the changePasswordInitAction success
 */
const changePasswordInitSuccessAction = (data) => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: data
});

/**
 * Action which is callled when the changePasswordInitAction failed
 */
const changePasswordInitErrorAction = (error) => ({
    type: CHANGE_PASSWORD_ERROR,
    payload: error
});

/**
 * Function to fetch init data from Auth user
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object} This contains data from restaurants
 */
export const changePasswordData = (data, id) => async (dispatch) => {
    dispatch(changePasswordInitAction());
    try {
        const response = await API.changePassword(data, id);
        const responseData = response['data'];
        dispatch(alertActivateAction({text: 'Password succesfully updated', alert: 'success'}));
        return dispatch(changePasswordInitSuccessAction(responseData));
    } catch (error) {
        if (error.response.data.old_password) {
            dispatch(alertActivateAction({text: 'Incorrect old password', alert: 'danger'}));
        } else if (error.response.data.password) {
            dispatch(alertActivateAction({text: 'Please create a strong password', alert: 'danger'}));
        } else {
            dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        }
        return dispatch(changePasswordInitErrorAction(`Error: ${error}`));
    }
}

/**
 * Action to remove Image
 */
 const removeImageDataInitAction = () => ({
    type: REMOVE_IMAGE_DATA
});

/**
 * Action to remove Image success
 */
const removeImageDataSuccessAction = (data) => ({
    type: REMOVE_IMAGE_DATA_SUCCESS,
    payload: data
});

/**
 * Action to remove Image failed
 */
const removeImageDataErrorAction = () => ({
    type: REMOVE_IMAGE_DATA_SUCCESS
});

/**
 * Function to add remove Image
 * @param {function} dispatch it is a function to dispatch actions to
 * update the store about the content of the app
 * @returns {Object}
 */
export const removeImagetData = (id) => async (dispatch) => {
    dispatch(removeImageDataInitAction());
    try {
        await API.deleteImage(id);
        dispatch(alertActivateAction({text: 'Image removed', alert: 'success'}));
        return dispatch(removeImageDataSuccessAction());
    } catch (error) {
        dispatch(alertActivateAction({text: 'An error occurred', alert: 'danger'}));
        return dispatch(removeImageDataErrorAction({error: error}));
    }
}