import React from 'react';
import Button from '../utils/Button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProductInfo = props => {
  const { detail } = props;

  // render product's shipping and availablility info
  const showProdTags = () => (
    <div className="product-detail__tags">
      {/** the shipping info of product */}
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag__text">
            <div>Free shipping</div>
            <div>And return</div>
          </div>
        </div>
      ) : null}

      {/** the availablility of product */}
      {
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={detail.availble ? faCheck : faTimes} />
          </div>
          <div className="tag__text">
            <div>{detail.available ? 'Available' : 'Not available'}</div>
            <div>{detail.available ? 'in store' : 'pre-order only'}</div>
          </div>
        </div>
      }
    </div>
  );

  const showProdActions = () => (
    <div className="product-detail__actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        { props.authStatus ?
          <Button
          type="add_to_cart_link"
          runAction={() => {
            props.addToCart(detail._id);
          }}
        />
        : <div>Please login to Add your item to cart</div>
        }
      </div>
    </div>
  );

  const showProdSpecifications = () => (
    <div className="product-detail__specifications">
      <h3>Specification</h3>
      <div>
        <div className="item">
          <span>
            <strong>Footstep</strong>: {detail.footStep ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="item">
          <span>
            <strong>Type</strong>: {detail.type.name}
          </span>
        </div>
      </div>
    </div>
  );

  
  return (
    <div className="product-detail__wrapper">
      <h2>{detail.brand.name}</h2>
      <h1>{detail.name}</h1>
      <p className="mb-lg">{detail.description}</p>
      {showProdTags()}
      {showProdActions()}
      {showProdSpecifications()}
    </div>
  );
};

export default ProductInfo;
