import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCartItems,
  removeCartItem,
  addToCart,
  decreaseCartItem
} from '../../actions/userActions';
import UserLayout from '../HOC/UserLayout';
import UserProductBlock from '../utils/User/ProductBlock';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
    cart: []
  };

  componentDidMount() {
    this.fetchCartItemDetail();
  }

  // fetch cartDetail from server
  fetchCartItemDetail() {
    let cartItems = [];
    let { cart } = this.props.user.userData;

    if (cart) {
      if (cart.length > 0) {
        cart.forEach(item => {
          cartItems.push(item.id);
        });

        // dispatch to fetch the product detail from server
        this.props.dispatch(getCartItems(cartItems, cart)).then(() => {
          // after dispatch user should have new cartDetail
          this.setState({
            cart: this.props.user.userData.cart
          });

          if (this.props.user.cartDetail.length > 0) {
            // get the total amount and update the state of 'total'
            this.calculateTotal(this.props.user.cartDetail);
          }
        });
      }
    }
  }

  // calculate the cart total amount
  calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    this.setState({
      total,
      showTotal: true
    });
  };

  // render the no item message if no items in cart
  renderNoItemInCartMessage = () => (
    <div className="cart-no-items">
      <div>You have no items in the cart</div>
    </div>
  );

  // action to remove cart's item
  removeFromCart = prodId => {
    this.props.dispatch(removeCartItem(prodId)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  updateItemQty = (prodId, operator) => {
    // console.log(prodId, operator)
    if (operator === '+') {
      // user.userData.cart
      this.props.dispatch(addToCart(prodId)).then(() => {
        this.fetchCartItemDetail();
      });
    } else if (operator === '-') {
      this.props.dispatch(decreaseCartItem(prodId)).then(() => {
        this.calculateTotal(this.props.user.cartDetail);

        if (this.props.user.cartDetail.length <= 0) {
          this.setState({
            showTotal: false
          });
        }
      });
    }
  };

  render() {
    const { user } = this.props;
    const { showTotal, total, showSuccess } = this.state;
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className="user-cart">
            <UserProductBlock
              products={user}
              type="cart"
              removeItem={prodId => this.removeFromCart(prodId)}
              updateItemQty={(prodId, operator) =>
                this.updateItemQty(prodId, operator)
              }
            />

            {showTotal ? (
              <div>
                <div className="user-cart__total">
                  <div>Total amount $ {total}</div>
                </div>
              </div>
            ) : showSuccess ? (
              <div className="cart-success">
                <div>Thank you</div>
                <div>Your order is now complete</div>
              </div>
            ) : (
              this.renderNoItemInCartMessage()
            )}
          </div>
          {showTotal ? (
            <div className="button--paypal__container">Paypal</div>
          ) : null}
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserCart);
