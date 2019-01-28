import React, { Component } from 'react';
import PageTop from '../utils/PageTop';
import { connect } from 'react-redux';
import {
  getBrands,
  getTypes,
  getProductsToShop
} from '../../actions/productsActions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

// custom fixed variable
import { FOOTSTEP, PRICE } from '../utils/Form/fixed_categories';

import LoadMoreCards from './LoadMoreCards';

import CollapseCheckBox from '../utils/CollapseCheckBox';
import CollapseRadio from '../utils/CollapseRadio';

class Shop extends Component {
  state = {
    grid: '',
    limit: 3,
    skip: 0,
    filters: {
      brand: [],
      footStep: [],
      type: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getTypes());

    this.props.dispatch(
      getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
    );
  }

  // convert the price id to actual valuee
  handlePrice = value => {
    const data = PRICE;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  // Handle the received filters array
  // 1) update the state of filters
  // 2) trigger the dispatch to re-refetch new products with new filters
  handleFilters = (filters, category) => {
    // make a copy of current state of filters
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    // re-fetch the products with updated filters
    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters
    });
  };

  // toggle the products display mode option
  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid-mode' : ''
    });
  };

  // Re-fetch new list of products when the newFilters changed/updated
  // skip = 0, as the whole list should be new generated
  // and won't skip any products
  showFilteredResults = filters => {
    this.props
      .dispatch(getProductsToShop(0, this.state.limit, filters))
      .then(() => {
        this.setState({ skip: 0 });
      });
  };

  // keep to original products list and get more products
  //  by increasing the skip
  // will re-refetch the remaining list from server
  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props
      .dispatch(
        getProductsToShop(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.products.toShop
        )
      )
      .then(() => {
        // update the new state of 'skip'
        this.setState({
          skip
        });
      });
  };

  render() {
    const { products } = this.props;

    return (
      <div>
        <PageTop title="Browse Product" />
        <div className="container">
          <div className="shop__wrapper">
            {
              ///////// Left side bar for filtering ///////////
            }
            <div className="shop__wrapper__left">
              <CollapseCheckBox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckBox
                initState={true}
                title="Types"
                list={products.types}
                handleFilters={filters => this.handleFilters(filters, 'type')}
              />
              <CollapseCheckBox
                initState={false}
                title="Footstep"
                list={FOOTSTEP}
                handleFilters={filters =>
                  this.handleFilters(filters, 'footStep')
                }
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={PRICE}
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />
            </div>

            {
              ///////// Right for displaying products card ///////////
            }
            <div className="shop__wrapper__right">
              <div className="display-options clear">
                <div
                  className={`display-options__btn ${
                    this.state.grid ? '' : 'active'
                  }`}
                  onClick={() => this.handleGrid()}
                >
                  <FontAwesomeIcon icon={faTh} />
                </div>
                <div
                  className={`display-options__btn ${
                    this.state.grid ? 'active' : ''
                  }`}
                  onClick={() => this.handleGrid()}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Shop);
