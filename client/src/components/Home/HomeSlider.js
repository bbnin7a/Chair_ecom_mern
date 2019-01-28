/**
 * Home page slider component
 */

import React from 'react';
import Slider from 'react-slick';
import Button from '../utils/Button';

const HomeSlider = props => {
  const slides = [
    {
      img: '/images/featured/featured_home.jpg',
      lineOne: 'Herman Miller',
      lineTwo: 'New Aeron chair',
      linkTitle: 'Shop now',
      linkTo: '/shop'
    },
    {
      img: '/images/featured/featured_home_2.jpg',
      lineOne: 'Steelcase',
      lineTwo: 'Awesome discounts',
      linkTitle: 'View offiers',
      linkTo: '/shop'
    }
  ];

  // slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  // render all slides
  const generateSlides = () =>
    slides
      ? slides.map((item, i) => (
          <div key={i}>
            <div
              className="featured__image"
              style={{
                background: `url(${item.img})`,
                height: `${window.innerHeight}px`
              }}
            >
              <div className="featured__action">
                <div className="tag featured__title">{item.lineOne}</div>
                <div className="tag featured__sub-title">{item.lineTwo}</div>
                <div>
                  <Button
                    type="default"
                    title={item.linkTitle}
                    linkTo={item.linkTo}
                    addStyles={{ margin: '1rem 0 0 0' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      : null;

  return (
    <div className="featured_container">
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
