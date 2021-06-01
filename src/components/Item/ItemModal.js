import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Spinner from '../Spinner';

class ItemModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showSelect: true
        }
      }

    async handleSubmit(event, props) {
        const { appActions, restaurantDetail } = props;
        event.preventDefault();
        const {name, price, description, category, menu, image, extra_notes} = event.target;
        const formData = {
            name: name.value,
            price: price.value,
            description: description.value,
            category: category.value,
            menu: menu.value,
            active: true,
            image: image,
            extra_notes: extra_notes.value
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

        const response = await appActions.addItemData(data, imageData, formData.menu, this.state.showSelect);
        if (response) {
            const button = document.getElementById('button-close-modal-item');
            if (button)
                button.click()
            this.setState({showSelect: true})
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
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <input name="name" type="text" className="form-control" id="itemNameInput" placeholder="Item name" required/>
                                    </div>
                                    <div className="col-6">
                                        <input name="price" type="text" min="0" className="form-control" id="itemPriceInput" placeholder="12.99 or 15000" onKeyPress={this.validate} required/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <textarea name="description" className="form-control" id="itemDescriptionInput" rows="3" required placeholder="Item description"></textarea>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <textarea name="extra_notes" className="form-control" id="itemNotesInput" rows="2" placeholder="Extra notes, food allergens, etc."></textarea>
                                    </div>
                                </div>
                                
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label htmlFor="itemMenuInput">
                                            Item menu
                                            <button className="btn btn-default" style={{visibility: 'hidden'}}>a</button>
                                        </label>
                                        <select name="menu" className="form-control" id="itemMenuInput" required>
                                            {
                                                menus.map(category => {
                                                    return (
                                                        <option value={category.id} key={category.id}>{ category.name }</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {menus.length === 0 ? <p className="text-danger"><b>Please create a menu</b></p> : <></>}
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="itemCategoryInput">
                                            Item category
                                            <button type="button" className="btn btn-default" onClick={() => {this.setState({showSelect: !this.state.showSelect})}}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </label>
                                        {this.state.showSelect ?
                                            <select name="category" className="form-control" id="itemCategoryInput" required>
                                                {
                                                    categories.map(category => {
                                                        return (
                                                            <option value={category.id} key={category.id}>{ category.name }</option>
                                                        )
                                                    })
                                                }
                                            </select> :
                                            <input placeholder="New category" name="category" className="form-control" type="text" required/>
                                        }
                                        {categories.length === 0 && this.state.showSelect ? <p className="text-danger"><b>Please create a category</b></p> : <></>}
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6 file-input">
                                        <label htmlFor="itemImageInput">Image</label>
                                        <input name="image" type="file" className="form-control-file" id="itemImageInput"/>
                                    </div>
                                </div>

                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-danger me-3" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-success">Submit</button>
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
