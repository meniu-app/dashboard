import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Spinner from '../Spinner';

class EditItemModal extends Component {

    constructor(props) {
        super(props);
        this.handleChangeItem = this.props.handleChangeItem.bind(this);
    }

    async handleSubmit(event, props) {
        const { appActions, item } = props;
        event.preventDefault();
        const {name, price, description, category, menu, image} = event.target;
        const formData = {
            name: name.value,
            price: price.value,
            description: description.value,
            category: category.value,
            menu: menu.value,
            active: true,
            image: image
        }
        const data = new FormData();
        const imageData = new FormData(event.target);
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('menu', formData.menu);
        data.append('active', formData.active);

        let imageId = item.images.length > 0 ? item.images[0].id : null;
        if (formData.image.value === '')
            imageId = null;

        const response = await appActions.editItemData(data, imageData, props.item.id, imageId);
        if (response)
            document.getElementById('button-close-modal-item-edit').click();
    }

    render () {

        const { restaurantDetail, formLoading, item, handleChangeItem } = this.props;
        const categories = restaurantDetail.categories;
        const menus = restaurantDetail.menus;
        const newItem = {...item};

        return (
            <div className="modal fade" id="editItemModal" tabIndex="-1" aria-labelledby="editItemModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editItemModalLabel">Edit item</h5>
                            <button id="button-close-modal-item-edit" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} method="PATCH" encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="itemNameInputEdit" className="form-label">Item name</label>
                                    <input name="name" type="text" className="form-control"  id="itemNameInputEdit" value={newItem.name} onChange={ handleChangeItem } placeholder="Sopa de tomate" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="itemPriceInputEdit" className="form-label">Item price</label>
                                    <input name="price" type="number" className="form-control" id="itemPriceInputEdit" value={newItem.price} onChange={ handleChangeItem } placeholder="12,99" required/>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="itemDescriptionInputEdit">Item description</label>
                                    <textarea name="description" className="form-control" value={newItem.description} id="itemDescriptionInputEdit" onChange={ handleChangeItem } rows="3" required></textarea>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="itemMenuInputEdit">Item menu</label>
                                    <select name="menu" className="form-control" value={newItem.menu} onChange={ handleChangeItem } id="itemMenuInputEdit" required>
                                        {
                                            menus.map(menu => {
                                                return (
                                                    <option value={menu.id} key={menu.id}>{ menu.name }</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="itemCategoryInputEdit">Item category</label>
                                    <select name="category" className="form-control" value={newItem.category !== '' ? newItem.category : categories[0].id} onChange={ handleChangeItem } id="itemCategoryInputEdit" required>
                                        {
                                            categories.map(category => {
                                                return (
                                                    <option value={category.id} key={category.id}>{ category.name }</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="itemImageInputEdit">Image</label>
                                    <input name="image" type="file" className="form-control-file" id="itemImageInputEdit" />
                                </div>
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                            : <Spinner />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditItemModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    handleChangeItem: PropTypes.func
};

const mapStateToProps = (state) => ({
    restaurantDetail: state.app.restaurantDetail,
    formLoading: state.app.formLoading,
});

const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(EditItemModal));
