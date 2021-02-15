import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getParameterByName } from '../../api/Helpers';
import { track } from '../../mixpanel';

class RestaurantDetail extends Component {

    componentDidMount() {
        const { accordionId } = this.props;
        const categoryId = getParameterByName('category', this.props.location.search);
        const elementToScroll = document.getElementById(`${accordionId}categoryItem${categoryId}`);
        if (elementToScroll !== null && accordionId !== 'dishDetailAccordion') {
            window.scrollTo({
                top: elementToScroll.offsetTop,
                behavior: 'smooth'
            })
        }
    }

    getImageLowResolution(item) {
        let imageUrl = item.images[0].image_url;
        imageUrl = imageUrl.split('/');
        imageUrl.splice(6, 0, 'w_200,h_200');
        imageUrl = imageUrl.join('/');
        return imageUrl;
    }

    getImageNormalResolution() {

    }

    render () {
        const { restaurant, accordionId, restaurantMenus, isScanned } = this.props;
        const itemUrl = "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
        const categoryId = getParameterByName('category', this.props.location.search);
        const showCategory = categoryId !== '' && categoryId !== undefined && accordionId !== 'dishDetailAccordion' ? true : false;
        const restaurantId = restaurant.id;
        const categories = Object.keys(restaurantMenus.categories).map(key => {return {id: key, ...restaurantMenus.categories[key]}})

        return (
            <div className="accordion" id={accordionId}>
            {
                categories.map(category => {
                    return (
                        <div className="accordion-item" key={category.id}>
                            <h2 className="accordion-header" id={`${accordionId}categoryItem` + category.id}>
                                <button onClick={() => track('Category clicked', { event: 'Category clicked', itemId: category.id, category })} className={`accordion-button ${showCategory && categoryId === category.id ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={"#categoryItemCollapse" + category.id} aria-expanded="true" aria-controls={"categoryItemCollapse" + category.id}>
                                    {category.name}
                                </button>
                            </h2>
                            <div id={"categoryItemCollapse" + category.id} className={`accordion-collapse collapse ${showCategory && categoryId === category.id ? "show" : ""}`} aria-labelledby={"categoryItem" + category.id} data-bs-parent={`#${accordionId}`}>
                                <ul className="list-group">
                                    {
                                        category.items.map(item => {
                                            return (
                                                <Link onClick={() => track('Item clicked', { event: 'Item clicked', itemId: item.id, item })} to={`/restaurant/${restaurantId}/dish/${item.id}?scanned=${isScanned}&category=${category.id}`} key={item.id} className="list-group-item list-group-item-dish">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <h5 className="mb-2">{item.name}</h5>
                                                            <p className="mb-2 restaurant-dish__description">{item.description}</p>
                                                            <p className="mb-0"><b>${item.price}</b></p>
                                                        </div>
                                                        <div className="col-4">
                                                            <img className="image--restaurant-dish" src={`${item.images.length > 0  ? this.getImageLowResolution(item) : itemUrl }`} alt="image" srcSet=""/>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        )
    }
}

RestaurantDetail.propTypes = {
    accordionId: PropTypes.string.isRequired,
    restaurantMenus: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
    isScanned: PropTypes.bool.isRequired,
    restaurant: PropTypes.object
};

export default withRouter(RestaurantDetail);
