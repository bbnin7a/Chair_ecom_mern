import React, { Component } from 'react';
import PageTop from '../utils/PageTop';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';

import { connect } from 'react-redux';
import {
  getProductDetail,
  clearProductDetail
} from '../../actions/productsActions';

class ProductPage extends Component {
  componentDidMount() {
    // get the query product id
    const prodId = this.props.match.params.prodId;
    this.props.dispatch(getProductDetail(prodId)).then(res => {

      // check whether the given id is exist in list
      // if not exist, redirect to home route
      if (!this.props.products.prodDetail) {
        this.props.history.push('/')
      }
    });
  }

  // clear the detail in redux store when unmount
  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCartHandler = prodId => {};

  render() {
    const { prodDetail } = this.props.products;
    return (
      <div>
        <PageTop title="Product Detail" />
        <div className="container">
          {prodDetail ? (
            <div className="product-detail">
              <div className="product-detail__left">
                <ProductImage detail={prodDetail} />
              </div>
              <div className="product-detail__right">
                <ProductInfo
                  detail={prodDetail}
                  addToCart={prodId => this.addToCartHandler(prodId)}
                />
              </div>
            </div>
          ) : (
            'Loading'
          )}
        </div>
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateTopProps)(ProductPage);
