import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className="bck-b__light">
        <div className="header__container container">
          <div className="header__left">
            <div className="header__logo">CHAIR</div>
          </div>
          <div className="header__right">
            <div className="header__top">LINKS</div>
            <div className="header__bottom">LINKS</div>
          </div>
          <div />
        </div>
      </header>
    );
  }
}
