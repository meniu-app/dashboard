import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators }from 'redux';
import { connect } from 'react-redux';
import * as appAction from './actions/appActions';
import { initialize } from './mixpanel';
import Api from './api/Api';

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
const Profile = lazy(() => import('./components/Profile/Profile'));
const ProfileEdit = lazy(() => import('./components/Profile/ProfileEdit'));
import Spinner from './components/Spinner';
import { getRefreshToken, removeTokens } from './api/TokenHandler';
import Alert from './components/Alert';

class App extends Component {
  async componentDidMount() {
    // Initialize mixpanel service
    initialize();
    const { appActions } = this.props;
    const refreshToken = getRefreshToken();
    if (refreshToken !== null) {
      const init = await Api.refreshToken({refresh: refreshToken}); 
      if (init.status === 200)
        await appActions.getRestaurantDetailInitialData();
      else
        removeTokens();
    }
    await appActions.appStart();
  }

  render() {
    const { appStarted, restaurantDetail, restaurantDataReady } = this.props;
    return (
      <div>
        {appStarted ?
        <Router>
          <Suspense fallback={<Spinner></Spinner>}>
            <Navbar restaurantDetail={restaurantDetail} restaurantDataReady={restaurantDataReady}/>
            <Alert />
            {
            <Switch>
              <Route exact path="/">
                <AuthenticatedRoute>
                  <div className="main-wrapper d-flex">
                    <Sidenav restaurantDetail={restaurantDetail} restaurantDataReady={restaurantDataReady} />
                    <Dashboard restaurantDetail={restaurantDetail} restaurantDataReady={restaurantDataReady} />
                  </div>
                </AuthenticatedRoute>
              </Route>
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
        </Router>:
        <Spinner></Spinner>
        }
      </div>
    );
  }
}

App.propTypes = {
  appActions: PropTypes.objectOf(PropTypes.func).isRequired,
  appStarted: PropTypes.bool.isRequired,
  restaurantDetail: PropTypes.object.isRequired,
  restaurantDataReady: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  appStarted: state.app.appStarted,
  restaurantDetail: state.app.restaurantDetail,
  restaurantDataReady: state.app.restaurantDataReady,
});

const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
