import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Spinner from '../Spinner';
import Modal from 'react-bootstrap/Modal';

class EditItemModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageRemoved: false,
            newImage: null,
            showSelect: true
        }
        this.handleChangeItem = this.props.handleChangeItem.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
        this.currentImage = this.currentImage.bind(this);
    }

    async handleSubmit(event) {
        const { appActions, item, restaurantDetail } = this.props;
        event.preventDefault();
        const {name, price, description, category, menu, image, extra_notes, availability} = event.target;
        const formData = {
            name: name.value,
            price: price.value,
            description: description.value,
            category: category.value,
            menu: menu.value,
            active: true,
            image: image,
            extra_notes: extra_notes.value,
            availability: availability?.checked
        }
        if (formData.category === '') {
            formData.category = null;
        }
        const data = new FormData();
        const imageData = new FormData(event.target);
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('menu', formData.menu);
        data.append('active', formData.active);
        data.append('extra_notes', formData.extra_notes);
        data.append('availability', formData.availability);

        let imageId = item.images.length > 0 ? item.images[0].id : null;
        if (formData.image.value === '')
            imageId = null;

        if (!this.state.showSelect) {
            const newCategory = await appActions.addCategoryData({
                restaurant: restaurantDetail.id,
                name: formData.category,
                description: formData.category
            })
            if (newCategory.type === 'ADD_CATEGORY_DATA_SUCCESS') {
                data.set('category', newCategory.payload.id)
            }
        }

        const response = await appActions.editItemData(data, imageData, this.props.item.id, imageId, this.state.imageRemoved);
        if (response) {
            this.props.changeShowEditModal();
            await appActions.getRestaurantTreeViewDetailData();
        }
    }

    validate (evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var value = evt.target.value + key;
        var regex = /^\d+(.\d{0,2})?$/;
        if( !regex.test(value) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    removeImage = async() => {
        const images = this.props.item?.images;
        const image = images.length > 0 ? images[0] : null;
        try {
            if (image !== null && !this.state.imageRemoved) {
                await this.props.appActions.removeImagetData(image.id)
                await this.props.appActions.getMenuDetailInitialData(this.props.item.menu);
                this.setState({imageRemoved: true})
            }
            this.setState({newImage: null})
        } catch (error) {
            this.setState({imageRemoved: false})
            this.setState({newImage: null})
        }
    }

    imageChanged (e) {
        this.setState({newImage: e.target})
    }

    currentImage (image) {
        if (this.state.newImage !== null)
            return URL.createObjectURL(this.state.newImage.files[0])
        else if(image?.image_url && !this.state.imageRemoved)
            return image.image_url
        else
            return this.props.restaurantDetail.logo_url
    }

    handleClose = () => {
        this.props.changeShowEditModal();
        setTimeout(() => {
            this.setState({
                imageRemoved: false,
                newImage: null
            })   
        }, 500);
    }

    render () {
        const { restaurantDetail, formLoading, item, handleChangeItem } = this.props;
        const categories = restaurantDetail.categories;
        const menus = restaurantDetail.menus;
        const newItem = {...item};
        const image = newItem?.images?.length > 0 ? newItem.images[0] : null

        return (
            <Modal show={this.props.showEditModal} onHide={this.handleClose}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="editItemModalLabel">Edit item</h5>
                        <button onClick={this.props.changeShowEditModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        { !formLoading ?
                        <form onSubmit={(e) => this.handleSubmit(e)} method="PATCH" encType="multipart/form-data">
                            <div className="row mb-4">
                                <div className="col">
                                    <input name="name" type="text" className="form-control"  id="itemNameInputEdit" value={newItem.name} onChange={ handleChangeItem } placeholder="Item name" required/>
                                </div>
                                <div className="col">
                                    <input name="price" type="text" min="0" className="form-control" id="itemPriceInputEdit" value={newItem.price} onChange={ handleChangeItem } onKeyPress={this.validate} placeholder="12.99 or 15000" required/>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <textarea name="description" className="form-control" value={newItem.description} id="itemDescriptionInputEdit" onChange={ handleChangeItem } rows="3" required placeholder="Item description"></textarea>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <textarea name="extra_notes" className="form-control" value={newItem.extra_notes ? newItem.extra_notes : ''} onChange={ handleChangeItem } id="editItemNotesInput" rows="2" placeholder="Extra notes, food allergens, etc."></textarea>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <label htmlFor="itemMenuInputEdit">
                                        Item menu
                                        <button className="btn btn-default" style={{visibility: 'hidden'}}>a</button>
                                    </label>
                                    <select name="menu" className="form-control" value={newItem.menu} onChange={ handleChangeItem } id="itemMenuInputEdit" required>
                                        {
                                            menus.map(menu => {
                                                return (
                                                    <option value={menu.id} key={menu.id}>{ menu.name }</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {menus.length === 0 ? <p className="text-danger"><b>Please create a menu</b></p> : <></>}
                                </div>
                                <div className="col-6">
                                    <label htmlFor="itemCategoryInputEdit">
                                        Item category
                                        <button type="button" className="btn btn-default" onClick={() => {this.setState({showSelect: !this.state.showSelect})}}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </label>
                                    {this.state.showSelect ?
                                        <select name="category" className="form-control" value={newItem.category} onChange={ handleChangeItem } id="itemCategoryInputEdit" required>
                                            {
                                                categories.map((category, index) => {
                                                    return (
                                                        <option value={category.id} key={category.id+index}>{ category.name }</option>
                                                    )
                                                })
                                            }
                                        </select>:
                                        <input placeholder="New category" name="category" className="form-control" type="text" required/>
                                    }
                                    {categories.length === 0  && this.state.showSelect ? <p className="text-danger"><b>Please create a category</b></p> : <></>}
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6 file-input">
                                    <img src={this.currentImage(image)} style={{width: '200px'}} />
                                </div>
                                <div className="col-6 file-input">
                                    <label htmlFor="itemImageInputEdit">Replace Image</label>
                                    <input name="image" type="file" className="form-control-file" id="itemImageInputEdit" onChange={e => this.imageChanged(e)}/>
                                    {
                                        image?.image_url && !this.state.imageRemoved ?
                                        <button type="button" className="btn btn-danger btn-sm mt-2" onClick={this.removeImage}>
                                            Remove Image
                                        </button> :
                                        <></>
                                    }
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <input name="availability" className="form-check-input" type="checkbox" id="itemAvailability" defaultChecked={newItem.availability}/>
                                    <label className="form-check-label ms-2" htmlFor="itemAvailability">Available {newItem.availability}</label>
                                </div>
                            </div>
                            <div className="mt-3 d-flex justify-content-end">
                                <button type="button" className="btn btn-danger me-3" onClick={this.props.changeShowEditModal}>Cancel</button>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                        </form>
                        : <Spinner />
                        }
                    </div>
            </Modal>
        )
    }
}

EditItemModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    handleChangeItem: PropTypes.func,
    menuDetail: PropTypes.object,
    showEditModal: PropTypes.bool,
    changeShowEditModal: PropTypes.func
};

const mapStateToProps = (state) => ({
    restaurantDetail: state.app.restaurantDetail,
    formLoading: state.app.formLoading,
    menuDetail: state.app.menuDetail
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(EditItemModal));
