import React from 'react';
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

class Dashboard extends React.Component {

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
            },
            showEditModal: false
        }
        this.setSelectedCategory = this.props.setSelectedCategory.bind(this)
        this.EditItemModalRef = React.createRef();
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

    handleChangeCategory = (e) => {
        this.props.setSelectedCategory({
            ...this.props.selectedCategory,
            [e.target.name]: e.target.value
        });
    }

    editButton = (item) => {
        this.setSelectedItem(item);
        this.setState({showEditModal: true})
    }

    changeShowEditModal = () => {
        this.setState({showEditModal: false})
    }

    formatNumber = (value) => {
        switch (this.props.restaurantDetail.country) {
            case 'AR':
                return new Intl.NumberFormat('ar', { style: 'currency', currency: 'DHS' }).format(value)
            case 'US':
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
            case 'ES':
                return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)
            case 'MX':
                return '$' + new Intl.NumberFormat('en-MX').format(value)
            default:
                return '$' + new Intl.NumberFormat('es-CO').format(value)
        }
    }

    qrurl = (menu_id) => {
        switch (window.location.href) {
            case 'http://lulo-dashboard-dev.herokuapp.com/':
                return 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://lulo-mobile-dev.herokuapp.com/restaurant/' + menu_id + '?scanned=true'
            case 'https://lulo-dashboard-dev.herokuapp.com/':
                return 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://lulo-mobile-dev.herokuapp.com/restaurant/' + menu_id + '?scanned=true'
            default:
                return 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://app.oklulo.com/restaurant/' + menu_id + '?scanned=true'
        }
    }

    render() {

        const { menuDetail, menuDetailDataReady, restaurantDataReady, restaurantDetail } = this.props;
        let categories = []
        const restaurantLogo = restaurantDetail.logo_url

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

        categories.sort((a, b) => a?.created_at > b?.created_at ? 1 : -1)

        return (
            <div id="main-content" className="col-xs-12 col-md-9 col-sm-8 col-lg-9 col-xl-10">
                <MainModal restaurantDataReady={restaurantDataReady} />
                {
                    restaurantDataReady &&
                    <div>
                        <ItemModal />
                        <CategoryModal />
                        <MenuModal />
                        <EditItemModal item={{...this.state.selectedItem}} showEditModal={this.state.showEditModal} changeShowEditModal={this.changeShowEditModal} handleChangeItem={this.handleChangeItem}/>
                        <DeleteItemModal item={{...this.state.selectedItem}}/>
                    </div>
                }
                <RestaurantModal />
                <UserModal />
                <DeleteMenuModal menu={{...menuDetail}} />
                {
                menuDetailDataReady ?
                <div className="px-4 my-4" id="menu-detail">
                    <section className="title col d-flex mb-4">
                        <div className="">

                        </div>
                        <div className="me-3 d-flex justify-content-start">
                            <h3 className="mb-0">
                                <img className="img-thumbnail me-3" src={this.qrurl(restaurantDetail.id)} width="180" alt="" onClick={() => window.open(this.qrurl(restaurantDetail.id), '_blank')}/>
                                Menu: {menuDetail.name}
                            </h3>
                            <div className="ms-3 d-flex align-items-center">
                                <button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editMenuModal">Edit</button>
                                <button className="btn btn-outline-danger ms-2 btn-sm"  data-bs-toggle="modal" data-bs-target="#deleteMenuModal">Delete</button>
                            </div>
                        </div>
                        <EditMenuModal menu={{...menuDetail}} handleChangeMenu={this.handleChangeMenu}/>
                    </section>
                    {
                        categories.map((category, index) => {
                            return (
                                <div key={category.id + index} id={category.id + index} className="category-group">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-6 col-md-6">
                                            <div className="card col-12 category-title my-3">
                                                <div className="card-body">
                                                    <h5 className="h6">{category.name}</h5>
                                                    {
                                                        category.id !== 'no_category' ?
                                                          <button className="btn btn-link color__blue" onClick={() => this.setSelectedCategory(category)} data-bs-toggle="modal" data-bs-target="#editCategoryModal">Edit Category</button>
                                                          : <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-cols-xl-6 row-cols-lg-6 row-cols-md-6">
                                            <button className="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#categoryModal">
                                                Add a category
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                    {
                                        category.items.map((item, indexItem) => {
                                            let image = item.images.length > 0 ? `${item.images[0].image_url}` : restaurantDetail.logo_url;
                                            if (image === 'null' || image === undefined) {
                                                image = restaurantLogo
                                            } else {
                                                image = image.split('/');
                                                image.splice(6, 0, 'c_scale,w_200');
                                                image = image.join('/');
                                            }
                                            return (
                                                <div className="col-xl-4 col-lg-6 col-md-6"  key={item.id + indexItem}>
                                                    <div className="card my-3">
                                                        <div className="card-body pb-0 d-flex">
                                                            <div className="me-3 col-5">
                                                                <h6>{item.name}</h6>
                                                                <p className="excerpt">{item.description}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <p className="me-1">
                                                                    <b>{this.formatNumber(item.price)}</b>
                                                                </p>
                                                            </div>
                                                            <div className="col-4">
                                                                <img className="img-thumbnail" style={{height: "64px"}} src={image !== null ? image : restaurantLogo} alt=""/>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex pe-3 pb-1">
                                                            <button onClick={() => this.editButton(item)} className="btn btn-link color__blue" style={{width: 'fit-content'}} >Edit</button>
                                                            <button onClick={() => this.setSelectedItem(item)} className="btn btn-link color__red" style={{width: 'fit-content'}} data-bs-toggle="modal" data-bs-target="#deleteItemModal">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                        <div className="row-cols-xl-6 row-cols-lg-6 row-cols-md-6 wrapper-btn-add">
                                            <button className="btn btn-outline-secondary btn-add color__blue" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#itemModal">
                                                + Add
                                            </button>
                                        </div>
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
    restaurantDetail: PropTypes.object,
    selectedCategory: PropTypes.object,
    setSelectedCategory: PropTypes.func.isRequired
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
