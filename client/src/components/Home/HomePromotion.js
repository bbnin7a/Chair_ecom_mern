/**
 * Home - Promotion banner component
 */
import React from 'react';
import Button from '../utils/Button';

const HomePromotion = props => {
  const promotion = {
    img: '/images/promotion/promotion_banner.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second hand ergonomic chairs',
    linkTitle: 'Shop now',
    linkTo: '/shop'
  };

  // render promotion banner
  const renderPromotion = () =>
    promotion ? (
      <div
        className="promotion__image"
        style={{ background: `url(${promotion.img})` }}
      >
        <div className="promotion__action">
          <div className="tag promotion__title">{promotion.lineOne}</div>
          <div className="tag promotion__sub-title">{promotion.lineTwo}</div>
          <div>
            <Button
              type="default"
              title={promotion.linkTitle}
              linkTo={promotion.linkTo}
              addStyles={{ margin: '1rem 0 0 0' }}
            />
          </div>
        </div>
      </div>
    ) : null;

  return <div className="promotion__container">{renderPromotion()}</div>;
};

export default HomePromotion;
