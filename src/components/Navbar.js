import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as appAction from '../actions/appActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { removeTokens } from '../api/TokenHandler';
import { track } from '../mixpanel';
import config from '../config';

class Navbar extends Component {

    logout = async () => {
        const { appActions } = this.props;
        await appActions.postLogout();
        track('Logout clicked');
        removeTokens();
        this.props.history.push('/');
    }

    render() {
        const { isLoggedIn } = this.props;
        const env = config.env;
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={() => track('Home clicked')}>
                        Meniu Dashboard{env === 'development' ? ' - Dev' : ''}
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav mr-auto">
                            {!isLoggedIn &&
                                <Link className="nav-link" to="/auth/login" onClick={() => track('Login clicked')}>Login</Link>}
                            {isLoggedIn &&
                                (
                                <>
                                    <Link className="nav-link" to="/profile" onClick={() => track('Profile clicked')}>Profile</Link>
                                    <span onClick={this.logout} className="nav--logout nav-link" href="/auth/logout">Logout</span>
                                </>
                                )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    history: PropTypes.object,
    process: PropTypes.object
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
)(withRouter(Navbar));

