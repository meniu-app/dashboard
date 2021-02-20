export default {
    app: {
        appStarted: false,

        isLoggedIn: false,

        isScanned: false,

        restaurants: [],
        restaurantsDataReady: false,

        restaurantDetail: {},
        restaurantDataReady: false,

        menuDetail: {},
        menuDetailDataReady: false,

        formLoading: false,

        message: {
            text: '',
            alert: 'success'
        }
    }
}