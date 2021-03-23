import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appAction from '../../actions/appActions';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { getParameterByName } from '../../api/Helpers';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            urlToken: null
        };
    }

    componentDidMount() {
        const { history } = this.props;
        const urlToken = getParameterByName('token', history.location.search)
        if (urlToken !== null && urlToken !== '') {
            this.setState({urlToken})
        }
    }

    getResetPasswordToken = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const { appActions } = this.props;
        this.setState({
            email
        });
        const response = await appActions.resetPasswordData(email);
        if (response.type === 'RESET_PASSWORD_SUCCESS') {
            this.setState({email: ''})
        }
    }

    resetPasswordConfirm = async (event) => {
        event.preventDefault();
        const password = event.target.password.value;
        const { appActions } = this.props;
        this.setState({
            password
        });
        const response = await appActions.resetPasswordConfirmData(password, this.state.urlToken);
        if (response) {
            this.setState({password: ''})
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
                { this.state.urlToken === null ?
                <form onSubmit={this.getResetPasswordToken} className="form--login" method="POST">
                    <h6>Reset your password</h6>
                    <p>
                        Enter the email address associated with your account
                        <br/>
                        and we will send you a link to reset your password
                    </p>
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email</label>
                        <input type="text" name="email" className="form-control" id="loginEmail" value={this.state.email} onChange={e => this.setState({email: e.target.value})} placeholder="email@domain.com" required></input>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="btn btn-success me-2">Send reset link</button>
                    </div>
                    <Link className="fw-bolder" to="/auth/login">Return to log in</Link>
                </form>
                :
                <form onSubmit={this.resetPasswordConfirm} className="form--login" method="POST">
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="loginPassword" value={this.state.password} onChange={e => this.setState({password: e.target.value})} required></input>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="btn btn-success me-2">Reset password</button>
                    </div>
                    <Link className="fw-bolder" to="/auth/login">Return to log in</Link>
                </form>
                }
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

