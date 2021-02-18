import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appAction from '../../actions/appActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ItemModal extends Component {

    handleSubmit(event) {
        event.preventDefault();
        const {name, price, description, category, menu} = event.target;

        const data = {
            name: name.value,
            price: price.value,
            description: description.value,
            category: category.value,
            menu: menu.value
        }

        console.log(data);
    }

    render () {

        const {categories} = this.props;

        console.log(categories)

        return (
            <div className="modal fade" id="itemModal" tabIndex="-1" aria-labelledby="itemModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="itemModalLabel">Add new item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
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
                                        <option>Select menu</option>
                                        <option value="1">Menu 1</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="itemCategoryInput">Item category</label>
                                    <select name="category" className="form-control" id="itemCategoryInput" required>
                                        <option>Select category</option>
                                        {
                                            categories.map(category => {
                                                return (
                                                    <option value={category.id} key={category.id}>{ category.name }</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mt-3 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ItemModal.propTypes = {
    appActions: PropTypes.objectOf(PropTypes.func).isRequired,
    categories: PropTypes.array.isRequired
};



const mapDispatchToProps = (dispatch) => ({
    appActions: bindActionCreators(appAction, dispatch),
});

export default connect(
    mapDispatchToProps,
)(withRouter(ItemModal));
