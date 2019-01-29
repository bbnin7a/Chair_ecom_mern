/**

 */
import React, { Component } from 'react';
import Lightbox from 'react-images';

export default class ImageLightbox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.position,
    images: []
  };

  // change the images structure to fit Lightbox
  // react-lightbox docs:
  // https://github.com/LaustAxelsen/react-lightbox
  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach(element => {
        images.push({ src: `${element}` });
      });
      return (state = { images });
    }
    return false;
  }

  // display the previous image (if have)
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };
  
  // display the next image (if have)
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  // inform parent
  closeLightbox = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Lightbox
        currentImage={this.state.currentImage}
        images={this.state.images}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={() => this.gotoPrevious()}
        onClickNext={() => this.gotoNext()}
        onClose={() => this.closeLightbox()}
      />
    );
  }
}
