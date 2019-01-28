import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CardBlock from '../utils/CardBlock'

import { connect } from 'react-redux'
import { getProductsByArrival, getProductsBySell } from '../../actions/productsActions'

class Home extends Component {

  // fetch the products from server 
  componentDidMount() {
    this.props.dispatch(getProductsBySell())
    this.props.dispatch(getProductsByArrival())
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock list={this.props.products.bySell} title="Best Selling Chairs" />
        <HomePromotion />
        <CardBlock list={this.props.products.byArrival} title="New arrivals" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home);