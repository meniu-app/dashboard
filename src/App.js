import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators }from 'redux';
import { connect } from 'react-redux';
import * as appAction from './actions/appActions';
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
import { getRefreshToken, getUser, getUserRole, removeTokens, removeUser } from './api/TokenHandler';
import Alert from './components/Alert';
import ResetPassword from './components/Auth/ResetPassword';
import ProfileChangePassword from './components/Profile/ProfileChangePassword';

class App extends Component {
  async componentDidMount() {
    const { appActions } = this.props;
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken !== null && refreshToken !== undefined) {
        const init = await Api.refreshToken({refresh: refreshToken});
        if (init.status === 200) {
          const user = getUser();
          if (user !== undefined && user !== null) {
            await appActions.isAuthenticatedData();
            if (getUserRole() === 'admin') {
              await appActions.getRestaurantInitialData();
              await appActions.getRestaurantTreeViewDetailData();
            }
            else {
              await appActions.getRestaurantDetailInitialData(undefined, user.id);
              await appActions.getRestaurantTreeViewDetailData();
            }
          } else {
            throw new Error('Session expired');
          }
        }
        else {
          throw new Error('Session expired');
        }
      }
    } catch (error) {
      removeTokens();
      removeUser();
      console.error(error);
    }
    await appActions.appStart();
  }
  
  render() {
    const { appStarted, restaurantDetail, restaurantDataReady, restaurantTreeViewData, restaurantTreeViewDataReady } = this.props;
    return (
      <div>
      {appStarted ?
        <Router>
        <Suspense fallback={<Spinner></Spinner>}>
        {
          <Switch>
          <Route exact path="/">
            <section>
              <Navbar/>
            </section>
            <Alert />
            <AuthenticatedRoute>
              <div className="container-fluid">
              <div id="main" className="row">
                  <Sidenav restaurantDetail={restaurantDetail} restaurantDataReady={restaurantDataReady} restaurantTreeViewData={restaurantTreeViewData} restaurantTreeViewDataReady={restaurantTreeViewDataReady} />
                  <Dashboard restaurantDetail={restaurantDetail} restaurantDataReady={restaurantDataReady} />
              </div>
              </div>
            </AuthenticatedRoute>
          </Route>
          <Route exact path="/settings">
            <Navbar/>
            <Alert />
            <AuthenticatedRoute>
              <Profile />
            </AuthenticatedRoute>
          </Route>
          <Route exact path="/settings/edit">
            <Navbar/>
            <Alert />
            <AuthenticatedRoute>
              <ProfileEdit />
            </AuthenticatedRoute>
          </Route>
          <Route exact path="/settings/change_password">
            <Navbar/>
            <Alert />
            <AuthenticatedRoute>
              <ProfileChangePassword />
            </AuthenticatedRoute>
          </Route>
          <Route exact path="/auth/login">
            <Alert />
            <UnAuthenticatedRoute>
              <Login />
            </UnAuthenticatedRoute>
          </Route>
          <Route exact path="/auth/reset_password">
            <Alert />
            <UnAuthenticatedRoute>
              <ResetPassword />
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
    restaurantTreeViewData: PropTypes.array.isRequired,
    restaurantDataReady: PropTypes.bool.isRequired,
    restaurantTreeViewDataReady: PropTypes.bool.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    appStarted: state.app.appStarted,
    restaurantDetail: state.app.restaurantDetail,
    restaurantTreeViewData: state.app.restaurantTreeViewData,
    restaurantDataReady: state.app.restaurantDataReady,
    restaurantTreeViewDataReady: state.app.restaurantTreeViewDataReady,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )(App);
    