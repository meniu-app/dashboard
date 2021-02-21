import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Spinner from '../Spinner';
import MainModal from './MainModal';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import { connect } from 'react-redux';
import ItemModal from '../Item/ItemModal';
import RestaurantModal from '../Restaurant/RestaurantModal';
import CategoryModal from '../Category/CategoryModal';
import MenuModal from '../Menu/MenuModal';
import UserModal from '../User/UserModal';
import EditItemModal from '../Item/EditItemModal';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {
                id: '',
                name: '',
                price: 0,
                description: '',
                menu: '',
                category: ''
            }
        }
    }

    handleChangeItem = (e) => {
        this.setState({
            selectedItem: {
                ...this.state.selectedItem,
                [e.target.name]: e.target.value
            }
        });
    }

    async componentDidMount() {
        const { appActions } = this.props;
        await appActions.getRestaurantDetailInitialData();
    }

    setSelectedItem(item) {
        this.setState({selectedItem: item});
    }

    render() {

        const { menuDetail, menuDetailDataReady, restaurantDataReady } = this.props;
        let categories = []

        if (menuDetailDataReady) {
            categories = Object.keys(menuDetail.categories).map(key => {return {id: key, ...menuDetail.categories[key]}})
        }

        return (
            <div id="main-content" className="container px-0">
                <MainModal />
                {
                    restaurantDataReady &&
                    <div>
                        <RestaurantModal />
                        <ItemModal />
                        <CategoryModal />
                        <MenuModal />
                        <UserModal />
                        <EditItemModal item={{...this.state.selectedItem}} handleChangeItem={this.handleChangeItem}/>
                    </div>
                }
                {
                menuDetailDataReady &&
                <div className="px-3">
                    <div>
                        <h4>{menuDetail.name}</h4>
                    </div> 
                    {
                        categories.map(category => {
                            return (
                                <div key={category.id}>
                                    <h5 className="text-center my-3">{category.name}</h5>
                                    <div className="row">
                                    {
                                        category.items.map(item => {
                                            return (
                                                <div className="col-4"  key={item.id}>
                                                    <div className="card my-2">
                                                        <div className="card-body d-flex">
                                                            <div className="me-3 flex-fill">
                                                                <h5>{item.name}</h5>
                                                                <h6>{item.price}</h6>
                                                                <p>{item.description}</p>
                                                            </div>
                                                            <div>
                                                                <img src="https://via.placeholder.com/100C/O" alt=""/>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => this.setSelectedItem(item)} className="btn btn-primary m-3" style={{width: 'fit-content'}} data-bs-toggle="modal" data-bs-target="#editItemModal">Edit item</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                }
            </div>
        )
    }
}

Dashboard.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    menuDetail: PropTypes.object.isRequired,
    menuDetailDataReady: PropTypes.bool.isRequired,
    restaurantDataReady: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    menuDetail: state.app.menuDetail,
    menuDetailDataReady: state.app.menuDetailDataReady,
    restaurantDataReady: state.app.restaurantDataReady
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
