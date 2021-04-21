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
            urlToken: null,
            passwordShow: false,
            confirmPassword: '',
            confirmPasswordShow: false
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
        const { appActions } = this.props;
        if (this.state.password !== this.state.confirmPassword) {
            return
        }
        const response = await appActions.resetPasswordConfirmData(this.state.password, this.state.urlToken);
        if (response) {
            this.setState({password: '', confirmPassword: ''})
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
                        <div className="field-group d-flex">
                            <input type={this.state.passwordShow ? "text" : "password"} name="password" className="form-control" id="resetPassword" value={this.state.password} onChange={e => this.setState({password: e.target.value})} required></input>
                            <button className="btn btn-default fw-bolder btn-show-password" onClick={() => this.setState({passwordShow: !this.state.passwordShow})} type="button">
                                {!this.state.passwordShow ? "Show" : "Hide"}
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <div className="field-group d-flex">
                            <input type={this.state.confirmPasswordShow ? "text" : "password"} name="confirmPassword" className="form-control" id="resetPasswordConfirm" value={this.state.confirmPassword} onChange={e => this.setState({confirmPassword: e.target.value})} required></input>
                            <button className="btn btn-default fw-bolder btn-show-password" onClick={() => this.setState({confirmPasswordShow: !this.state.confirmPasswordShow})} type="button">
                                {!this.state.confirmPasswordShow ? "Show" : "Hide"}
                            </button>
                        </div>
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

