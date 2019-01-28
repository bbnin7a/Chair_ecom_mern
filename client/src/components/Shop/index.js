import React, { Component } from 'react';
import PageTop from '../utils/PageTop';

import { connect } from 'react-redux';
import { getBrands, getTypes } from '../../actions/productsActions';

// custom fixed variable
import { FOOTSTEP, PRICE } from '../utils/Form/fixed_categories';

import CollapseCheckBox from '../utils/CollapseCheckBox';
import CollapseRadio from '../utils/CollapseRadio';

class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brands: [],
      footStep: [],
      types: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getTypes());
  }

  // convert the price id to actual valuee
  handlePrice = (value) => {
    const data = PRICE
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array
      }
    }

    return array
  }

  // Handle the received filters array
  handleFilters = (filters, category) => {
    // make a copy of current state of filters
    const newFilters = {...this.state.filters}
    newFilters[category] = filters

    if(category === 'price') {
      let priceValues = this.handlePrice(filters)
      newFilters[category] = priceValues
    }

    this.setState({
      filters: newFilters
    })

  };

  render() {
    const { products } = this.props;
    return (
      <div>
        <PageTop title="Browse Product" />
        <div className="container">
          <div className="shop__wrapper">
            <div className="shop__wrapper__left">
              <CollapseCheckBox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, 'brands')}
              />
              <CollapseCheckBox
                initState={true}
                title="Types"
                list={products.types}
                handleFilters={filters => this.handleFilters(filters, 'types')}
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
                handleFilters={filters =>
                  this.handleFilters(filters, 'price')
                }
              />
            </div>
            <div className="shop__wrapper__right">2</div>
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
