import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appAction from '../../actions/appActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
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
                { this.state.urlToken === null ?
                <form onSubmit={this.getResetPasswordToken} className="form--login" method="POST">
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email</label>
                        <input type="text" name="email" className="form-control" id="loginEmail" value={this.state.email} onChange={e => this.setState({email: e.target.value})} placeholder="email@domain.com" required></input>
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                </form>
                :
                <form onSubmit={this.resetPasswordConfirm} className="form--login" method="POST">
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="loginPassword" value={this.state.password} onChange={e => this.setState({password: e.target.value})} required></input>
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
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

