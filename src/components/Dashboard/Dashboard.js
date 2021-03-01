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
import EditMenuModal from '../Menu/EditMenuModal';
import DeleteMenuModal from '../Menu/DeleteMenuModal';
import DeleteItemModal from '../Item/DeleteItemModal';

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

    handleChangeMenu = (e) => {
        this.setState({
            selectedMenu: {
                ...this.state.selectedMenu,
                [e.target.name]: e.target.value
            }
        });
    }

    setSelectedItem(item) {
        if (item.category === null) {
            this.setState({selectedItem: {...item, category: ''}});
        }else {
            this.setState({selectedItem: item});
        }
    }

    render() {

        const { menuDetail, menuDetailDataReady, restaurantDataReady, restaurantDetail } = this.props;
        let categories = []

        if (menuDetailDataReady) {
            categories = Object.keys(menuDetail.categories).map(key => {return {id: key, ...menuDetail.categories[key]}})
            if (restaurantDetail.items_no_category.length > 0) {
                categories.push({id: '', name: 'No category', items: restaurantDetail.items_no_category});
            }
            console.log(categories)
            setTimeout(() => {
                console.log(categories)   
            }, 2000);
        }

        return (
            <div id="main-content" className="container px-0">
                <MainModal restaurantDataReady={restaurantDataReady} />
                {
                    restaurantDataReady &&
                    <div>
                        <ItemModal />
                        <CategoryModal />
                        <MenuModal />
                        <EditItemModal item={{...this.state.selectedItem}} handleChangeItem={this.handleChangeItem}/>
                        <DeleteItemModal item={{...this.state.selectedItem}}/>
                    </div>
                }
                <RestaurantModal />
                <UserModal />
                {
                menuDetailDataReady &&
                <div className="px-3">
                    <div className="d-flex">
                        <h4 className="me-3">{menuDetail.name}</h4>
                        <button className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#editMenuModal">Edit menu</button>
                        <button className="btn btn-danger ms-2"  data-bs-toggle="modal" data-bs-target="#deleteMenuModal">Delete menu</button>
                        <EditMenuModal menu={{...menuDetail}} handleChangeMenu={this.handleChangeMenu}/>
                        <DeleteMenuModal menu={{...menuDetail}} />
                    </div>
                    <div className="row mt-3">
                        <div className="col-4">
                            <img className="img-thumbnail" src={menuDetail.qr_code} alt=""/>
                        </div>
                    </div>
                    {
                        categories.map(category => {
                            return (
                                <div key={category.id}>
                                    <h5 className="text-center my-3">{category.name}</h5>
                                    <div className="row">
                                    {
                                        category.items.map(item => {
                                            const image = item.images.length > 0 ? `${item.images[0].image_url}` : "https://via.placeholder.com/100C/O";
                                            return (
                                                <div className="col-12 col-lg-4"  key={item.id}>
                                                    <div className="card my-2">
                                                        <div className="card-body d-flex">
                                                            <div className="me-3 flex-fill">
                                                                <h5>{item.name}</h5>
                                                                <h6>{item.price}</h6>
                                                                <p>{item.description}</p>
                                                            </div>
                                                            <div>
                                                                <img className="img-thumbnail" src={image} alt=""/>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => this.setSelectedItem(item)} className="btn btn-primary m-3" style={{width: 'fit-content'}} data-bs-toggle="modal" data-bs-target="#editItemModal">Edit item</button>
                                                        <button onClick={() => this.setSelectedItem(item)} className="btn btn-danger m-3" style={{width: 'fit-content'}} data-bs-toggle="modal" data-bs-target="#deleteItemModal">Delete item</button>
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
    restaurantDataReady: PropTypes.bool.isRequired,
    restaurantDetail: PropTypes.object
};

const mapStateToProps = (state) => ({
    menuDetail: state.app.menuDetail,
    menuDetailDataReady: state.app.menuDetailDataReady,
    restaurantDataReady: state.app.restaurantDataReady,
    restaurantDetail: state.app.restaurantDetail
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);
