import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appAction from '../actions/appActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class Alert extends Component {

    async deactivateAlert(event, props) {
        const { appActions } = props;
        await appActions.alertDeactivate()
    }

    render() {
        const { message } = this.props;

        return (
            <div>
                {message.text !== '' &&
                <div className={`alert alert-${message.alert} alert-dismissible fade show`} role="alert">
                    {message.text}
                    <button onClick={e => {this.deactivateAlert(e, this.props)}} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                }
            </div>
        );
    }
}

Alert.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    message: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    message: state.app.message
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Alert));

