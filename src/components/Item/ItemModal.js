import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Spinner from '../Spinner';

class ItemModal extends Component {

    async handleSubmit(event, props) {
        const { appActions } = props;
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

        const response = await appActions.addItemData(data, imageData);
        if (response)
            document.getElementById('button-close-modal-item').click();
        
    }

    render () {

        const { restaurantDetail, formLoading } = this.props;
        const categories = restaurantDetail.categories;
        const menus = restaurantDetail.menus;

        return (
            <div className="modal fade" id="itemModal" tabIndex="-1" aria-labelledby="itemModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="itemModalLabel">Add new item</h5>
                            <button id="button-close-modal-item" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { !formLoading ?
                            <form onSubmit={(e) => this.handleSubmit(e, this.props)} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="itemNameInput" className="form-label">Item name</label>
                                    <input name="name" type="text" className="form-control" id="itemNameInput" placeholder="Sopa de tomate" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="itemPriceInput" className="form-label">Item price</label>
                                    <input name="price" type="number" className="form-control" id="itemPriceInput" placeholder="12,99" required/>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="itemDescriptionInput">Item description</label>
                                    <textarea name="description" className="form-control" id="itemDescriptionInput" rows="3" required></textarea>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="itemMenuInput">Item menu</label>
                                    <select name="menu" className="form-control" id="itemMenuInput" required>
                                        {
                                            menus.map(category => {
                                                return (
                                                    <option value={category.id} key={category.id}>{ category.name }</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="itemCategoryInput">Item category</label>
                                    <select name="category" className="form-control" id="itemCategoryInput" required>
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
                                    <label htmlFor="itemImageInput">Image</label>
                                    <input name="image" type="file" className="form-control-file" id="itemImageInput" />
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

ItemModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    restaurantDetail: PropTypes.object.isRequired,
    formLoading: PropTypes.bool.isRequired
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
)(withRouter(ItemModal));
