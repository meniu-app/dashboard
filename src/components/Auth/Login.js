import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appAction from '../../actions/appActions';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { getUser, getUserRole } from '../../api/TokenHandler';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    loginSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const { appActions } = this.props;

        this.setState({
            email,
            password
        });
        const response = await appActions.postLoginData(email, password);
        if (response['type'] === 'POST_LOGIN_SUCCESS') {
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
            }
            this.props.history.push('/');
        }
    }

    render() {

        return (
            <div className="container mb-5">
                <div className="intro row m-3">
                    <div className="col text-center">
                        <h1>LULO Partner</h1>
                        <h3>Understand your business like never before</h3>
                    </div>
                </div>
                <form onSubmit={this.loginSubmit} className="form--login" action="http://auth/login" method="POST">
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label fw-bolder">Email</label>
                        <input type="text" name="email" className="form-control" id="loginEmail" placeholder="email@domain.com" required></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label fw-bolder">Password</label>
                        <Link to="/auth/reset_password" type="link" className="float-end fw-bolder">Forgot your password?</Link>
                        <div className="field-group"><input type="password" name="password" className="form-control" id="loginPassword" required></input>
                            <label className="form-label fw-bolder">Show</label>{" "}
                        </div>
                    </div>
                    <div clasName="d-grid gap-2">
                       {/* #BUG: Don't recognize the block button tag B5 */}
                        <p className="text-center"><button className="btn btn-success btn-lg" type="button">Sign in</button></p>
                    </div>
                    <div className="mb-1 text-center">
                        <p>No account? <a href="#"><strong>partner with Lulo!</strong></a><br/>
                            Need more login help?<br/>
                            Please contact support via <a href="#"><strong>WhatsApp HERE</strong></a>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    history: PropTypes.object
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.app.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login));

