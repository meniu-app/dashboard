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
        } else {
            this.setState({selectedItem: item});
        }
    }

    render() {

        const { menuDetail, menuDetailDataReady, restaurantDataReady, restaurantDetail } = this.props;
        let categories = []

        if (menuDetailDataReady) {
            categories = Object.keys(menuDetail.categories).map(key => {return {id: key, ...menuDetail.categories[key]}})
            if (restaurantDetail.items_no_category?.length > 0) {
                if (restaurantDetail.items_no_category.length > 0)
                    categories.push({id: '1', name: 'No category', items: restaurantDetail.items_no_category});
            }
        }

        categories = categories.filter(category => {
            if (category.items.length > 0)
                return category
        })

        return (
            <div id="main-content" className="col-md-8 col-xs-12 px-0">
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
                <DeleteMenuModal menu={{...menuDetail}} />
                {
                menuDetailDataReady ?
                <div className="px-4 my-4" id="menu-detail">
                    <section className="title col d-flex">
                        <div className="">

                        </div>
                        <div className="me-3 d-flex justify-content-start">
                            <h3><img className="img-thumbnail" src={menuDetail.qr_code} width="128" alt=""/> Menu: {menuDetail.name}</h3>
                            <div className="ms-3">
                                <button className="btn btn-outline-primary btn-sm"  data-bs-toggle="modal" data-bs-target="#editMenuModal">Edit</button>
                                <button className="btn btn-outline-danger ms-2 btn-sm"  data-bs-toggle="modal" data-bs-target="#deleteMenuModal">Delete</button>
                            </div>
                        </div> 
                        <EditMenuModal menu={{...menuDetail}} handleChangeMenu={this.handleChangeMenu}/>
                    </section>
                    {
                        categories.map((category, index) => {
                            return (
                                <div key={category.id + index} id={category.id + index} className="category-group">
                                    <div className="card col-md-5 col-12 category-title">
                                        <div className="card-body">
                                            <h5 className="h6">{category.name}</h5>
                                            <a href="#">Edit Category</a>
                                        </div>
                                    </div>
                                    <div className="row">
                                    {
                                        category.items.map((item, indexItem) => {
                                            const image = item.images.length > 0 ? `${item.images[0].image_url}` : "https://via.placeholder.com/100C/O";
                                            return (
                                                <div className="col-12 col-sm-6 col-md-4 col-lg-4"  key={item.id + indexItem}>
                                                    <div className="card my-2">
                                                        <div className="card-body d-flex">
                                                            <div className="me-3 flex-fill">
                                                                <h6>{item.name}</h6>
                                                                <p className="mb-1"><b>{item.price}</b></p>
                                                                <p>{item.description}</p>
                                                            </div>
                                                            <div>
                                                                <img className="img-thumbnail" style={{width: "80px"}} src={image} alt=""/>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex pe-3 ps-3 pb-3">
                                                            <button onClick={() => this.setSelectedItem(item)} className="btn btn-outline-primary me-3" style={{width: 'fit-content'}} data-bs-toggle="modal" data-bs-target="#editItemModal">Edit</button>
                                                            <button onClick={() => this.setSelectedItem(item)} className="btn btn-outline-danger" style={{width: 'fit-content'}} data-bs-toggle="modal" data-bs-target="#deleteItemModal">Delete</button>
                                                        </div>
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
                </div> : <></>
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
