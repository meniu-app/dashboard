import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appAction from '../../actions/appActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
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
        if (response['type'] === 'POST_LOGIN_SUCCESS')
        {
            await appActions.getRestaurantInitialData();
            this.props.history.push('/');
        }
    }

    render() {

        return (
            <div className="container mb-5">
                <form onSubmit={this.loginSubmit} className="form--login" action="http://auth/login" method="POST">
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email</label>
                        <input type="text" name="email" className="form-control" id="loginEmail" placeholder="myuser"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="loginPassword"></input>
                    </div>
                    <button className="btn btn-primary">Login</button>
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

