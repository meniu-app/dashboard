import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators }from 'redux';
import { connect } from 'react-redux';
import * as appAction from './actions/appActions';
import { initialize } from './mixpanel';

/**
 * Load components
 */
const AuthenticatedRoute = lazy(() => import('./components/AuthenticatedRoute'));
const UnAuthenticatedRoute = lazy(() => import('./components/UnAuthenticatedRoute'));
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Login = lazy(() => import('./components/Auth/Login'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Sidenav = lazy(() => import('./components/Sidenav/Sidenav'));
// const RestaurantDetail = lazy(() => import('./components/Restaurant/RestaurantDetail'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const ProfileEdit = lazy(() => import('./components/Profile/ProfileEdit'));
import Spinner from './components/Spinner';

class App extends Component {
  async componentDidMount() {
    // Initialize mixpanel service
    initialize();
    const { appActions } = this.props;
    await appActions.getRestaurantInitialData();
  }

  render() {
    const { restaurants, isRestaurantsDataReady } = this.props;
    return (
      <div>
        <Router>
          <Suspense fallback={<Spinner></Spinner>}>
            <Navbar/>
            {
            <Switch>
              <Route exact path="/">
                <AuthenticatedRoute>
                  <div className="main-wrapper d-flex">
                    <Sidenav />
                    <Dashboard restaurants={restaurants} isRestaurantsDataReady={isRestaurantsDataReady} />
                  </div>
                </AuthenticatedRoute>
              </Route>
              {/* <Route path="/restaurant/:id">
                <RestaurantDetail />
              </Route> */}
              <Route exact path="/profile">
                <AuthenticatedRoute>
                  <Profile />
                </AuthenticatedRoute>
              </Route>
              <Route exact path="/profile/edit">
                <AuthenticatedRoute>
                  <ProfileEdit />
                </AuthenticatedRoute>
              </Route>
              <Route exact path="/auth/login">
                <UnAuthenticatedRoute>
                  <Login />
                </UnAuthenticatedRoute>
              </Route>
              <Route path="*">
                <Redirect to="/"></Redirect>
              </Route>
            </Switch>
            }
            <Footer />
          </Suspense>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  appActions: PropTypes.objectOf(PropTypes.func).isRequired,
  restaurants: PropTypes.array.isRequired,
  isRestaurantsDataReady: PropTypes.bool.isRequired,
  isScanned: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: state.app.restaurants,
  isRestaurantsDataReady: state.app.isRestaurantsDataReady,
  isScanned: state.app.isScanned
});

const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
