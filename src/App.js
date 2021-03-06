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
const Settings = lazy(() => import('./components/Settings/Settings'));
import Spinner from './components/Spinner';
import { getRefreshToken, getUser, getUserRole, removeTokens, removeUser } from './api/TokenHandler';
import Alert from './components/Alert';
import ResetPassword from './components/Auth/ResetPassword';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: {
        id: '',
        name: '',
        description: ''
      },
    }
  }

  setSelectedCategory = (category) => {
    this.setState({selectedCategory: category});
  }

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
              // await appActions.getRestaurantTreeViewDetailData();
              await appActions.getRestaurantAdminTreeViewDetailData();
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
      <div className="flex-column">
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
              <div className="container-fluid flex-1">
              <div id="main" className="row">
                  <Sidenav restaurantDetail={restaurantDetail}
                    restaurantDataReady={restaurantDataReady}
                    restaurantTreeViewData={restaurantTreeViewData}
                    restaurantTreeViewDataReady={restaurantTreeViewDataReady}
                    selectedCategory={this.state.selectedCategory}
                    setSelectedCategory={this.setSelectedCategory}/>
                  <Dashboard restaurantDetail={restaurantDetail}
                    restaurantDataReady={restaurantDataReady}
                    selectedCategory={this.state.selectedCategory}
                    setSelectedCategory={this.setSelectedCategory}/>
              </div>
              </div>
            </AuthenticatedRoute>
          </Route>
          <Route exact path="/profile">
            <Navbar/>
            <Alert />
            <AuthenticatedRoute>
              <Profile />
            </AuthenticatedRoute>
          </Route>
          <Route exact path="/settings">
            <Navbar/>
            <Alert />
            <AuthenticatedRoute>
              <Settings />
            </AuthenticatedRoute>
          </Route>
          <Route exact path="/auth/login">
            <UnAuthenticatedRoute>
              <Login />
              <Footer />
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
