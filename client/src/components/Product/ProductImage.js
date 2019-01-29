import React, { Component } from 'react';
import ImageLightbox from '../utils/ImageLightbox';

export default class ProductImage extends Component {
  state = {
    open: false,
    imagePosition: 0,
    lightboxImages: []
  };

  // initial the state of lightboxImages
  componentDidMount() {
    const { images } = this.props.detail;
    if (images.length > 0) {
      let lightboxImages = [];

      images.forEach(image => {
        lightboxImages.push(image.url);
      });

      this.setState({
        lightboxImages
      });
    }
  }

  // render the product image
  renderProductImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_available.png';
    }
  };

  // decide which image to popup
  handleLightbox = position => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePosition: position
      });
    }
  };

  // toggle the lightbox switch
  handleLightboxClose = () => {
    this.setState({
      lightbox: false
    });
  };

  // render the product thumbnail images
  renderProductThumbImage = () =>
    this.state.lightboxImages.map((image, i) =>
      i > 0 ? (
        <div
          key={i}
          className="thumb"
          onClick={() => this.handleLightbox(i)}
          style={{ background: `url(${image}) no-repeat` }}
        />
      ) : null
    );

  render() {
    const { detail } = this.props;
    return (
      <div className="product-image__container">
        <div className="product-image__main">
          <div
            style={{
              background: `url(${this.renderProductImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightbox(0)}
          />
        </div>
        <div className="product-image__thumbs">
          {this.renderProductThumbImage()}
        </div>
        {this.state.lightbox ? (
          <ImageLightbox
            prodID={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            position={this.state.imagePosition}
            onClose={() => this.handleLightboxClose()}
          />
        ) : null}
      </div>
    );
  }
}
