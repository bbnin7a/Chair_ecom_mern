/**
 * CARD TEMPLATE
 * =============
 */

import React, { Component } from 'react';
import Button from '../utils/Button';

export default class Card extends Component {

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

  render() {
    const props = this.props;
    return (
      <div className={`card-item__wrapper ${props.grid}`}>
        <div
          className="card-item__image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
          }}
        />
        <div className="card-item__actions">
          <Button
            type="default"
            altClass="button--link-card"
            title="View product"
            linkTo={`/product_detail/${props._id}`}
            addStyles={{
              margin: '1rem 0 0 0'
            }}
          />
          <Button
            type="bag_link"
            runAction={() => {
              console.log('added to card');
            }}
          />
        </div>
        <div className="card-item">
          <div className="card-item__tags">
            <div className="card-item__brand">{props.brand.name}</div>
            <div className="card-item__name">{props.name}</div>
            <div className="card-item__price">${props.price}</div>
          </div>
          {props.grid ? (
            <div className="card-item__description">kdklsfjalkdfklsdfj</div>
          ) : null}
        </div>
      </div>
    );
  }
}
