import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';

class Sidenav extends Component {

    async getMenuDetail(id) {
        const { appActions } = this.props;
        await appActions.getMenuDetailInitialData(id);
    }

    render() {
        const { restaurantDetail, restaurantDataReady } = this.props;
        return (
            <nav id="main-sidebar">
                <div className="row my-4">
                    <div className="col-12 text-center">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mainModal">
                            Add
                        </button>
                    </div>
                </div>
                <div className="row">
                {
                    restaurantDataReady &&
                    restaurantDetail.menus.map(menu => {
                        return (
                            <div className="col-12 text-center" key={menu.id}>
                                <button className="btn btn-ligth" onClick={() => this.getMenuDetail(menu.id)}>
                                    {menu.name}
                                </button>
                            </div>
                        )
                    })
                }
                </div>
            </nav>
        );
    }
}

Sidenav.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    restaurantDataReady: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    menuDetail: state.app.menudetail,
    menuDataReady: state.app.menuDataReady,
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sidenav);
