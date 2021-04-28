export default {
    app: {
        appStarted: false,

        isLoggedIn: false,

        isScanned: false,

        restaurants: [],
        restaurantsDataReady: false,

        restaurantDetail: {},
        restaurantDataReady: false,

        restaurantTreeViewData: [],
        restaurantTreeViewDataReady: false,

        menuDetail: {},
        menuDetailDataReady: false,

        formLoading: false,

        message: {
            text: '',
            alert: 'success'
        },

        loginError: false
    }
}
