/**
 * CARD TEMPLATE
 * =============
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import Button from '../utils/Button';
import TextTruncate from 'react-text-truncate';

import { connect } from 'react-redux';
import { addToCart } from '../../actions/userActions';

class Card extends Component {
  // render card images
  renderCardImage(images) {
    // if multiple images exist, return the first image
    if (images.length > 0) {
      return images[0].url;
    } else {
      // if no images
      return '/images/image_not_available.png';
    }
  }

  // redirect user to login
  renderLoginPage = () => {
    this.props.history.push('/register_login');
  };

  render() {
    const props = this.props;
    return (
      <div className={`card-item__wrapper ${props.grid ? props.grid : ''}`}>
        <Link to={`/product_detail/${props._id}`}>
          <div
            className="card-item__image"
            style={{
              background: `url(${this.renderCardImage(props.images)}) no-repeat`
            }}
          />
        </Link>
        <div className="card-item__container">
          <div className="card-item__tags">
            <div className="card-item__brand">{props.brand.name}</div>
            <div className="card-item__name">{props.name}</div>
            <div className="card-item__price">${props.price}</div>
          </div>

          {props.grid ? (
            <div className="card-item__description">
              <TextTruncate
                line={3}
                truncateText=" ..."
                text={props.description}
                textTruncateChild={
                  <Link
                    to={`/product_detail/${props._id}`}
                    className="read-more"
                  >
                    Read more
                  </Link>
                }
              />
            </div>
          ) : null}

          <div className="card-item__actions">
            <div className="button-wrapper">
              <Button
                type="default"
                altClass="button--link-card"
                title="View product"
                linkTo={`/product_detail/${props._id}`}
                addStyles={{
                  margin: '1rem 0 0 0'
                }}
              />
            </div>
            <div className="button-wrapper">
              <Button
                type="bag_link"
                runAction={() => {
                  // only autheticated user is able
                  // to add product to cart
                  props.user.userData.isAuth
                    ? this.props.dispatch(addToCart(props._id))
                    : this.renderLoginPage();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(withRouter(Card));
