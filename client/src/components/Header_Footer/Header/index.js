import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/userActions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowCircleRight from '@fortawesome/fontawesome-free-solid/faArrowCircleRight'
import faArrowAltCircleLeft from '@fortawesome/fontawesome-free-solid/faArrowAltCircleLeft'
import faShoppingBasket from '@fortawesome/fontawesome-free-solid/faShoppingBasket'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'

class Header extends Component {
  // ** navigation links
  // if public is false, it means only authenticated user can see this links
  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Shop',
        linkTo: '/shop',
        public: true
      }
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false,
        icon: faShoppingBasket
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false,
        icon: faUser
      },
      {
        name: 'Logout',
        linkTo: '/user/logout',
        public: false,
        icon: faArrowAltCircleLeft
      },
      {
        name: 'Login',
        linkTo: '/register_login',
        public: true,
        icon: faArrowCircleRight
      }
    ]
  };

  renderIcon = (icon) => (
    <FontAwesomeIcon icon={icon} />
  )


  // logout a user when user hit 'Logout'
  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(res => {
      // redirect user to home route
      if (res.payload.logoutSuccess) {
        this.props.history.push('/');
      }
    });
  };

  caculateCartItems = (cart) => {
    let total = 0

    if (cart.length > 0) {
      cart.forEach(item => {
         total += item.quantity
      })
    }
    
    return total
  }

  // render the special cart link with qty indicator
  renderCartLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="header__cartLink" key={i}>
        <span>{user.cart ? 
          this.caculateCartItems(user.cart)

         : 0}</span>
        <Link to={item.linkTo}>{item.icon ? this.renderIcon(item.icon) : null} {item.name}</Link>
      </div>
    );
  };

  // render default link
  renderDefaultLink = (item, i) =>
    // if the link is logout
    item.name === 'Logout' ? (
      <div
        className="header__logout-link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.icon ? this.renderIcon(item.icon) : null} {item.name}
      </div>
    ) : (
      // default link
      <Link to={item.linkTo} key={i}>
        {item.icon ? this.renderIcon(item.icon) : null} {item.name}
      </Link>
    );

  // render corresponding links depends on authenticated status
  showLinks = type => {
    let list = [];

    // always true
    if (this.props.user.userData) {
      type.forEach(item => {
        // if user is not authenticated
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          // if user is authenticated, put everything to list except 'login' link
          if (item.name !== 'Login') {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, i) => {
      // differentiate the links
      if (item.name !== 'My Cart') {
        return this.renderDefaultLink(item, i);
      } else {
        return this.renderCartLink(item, i);
      }
    });
  };

  render() {
    return (
      <header className="bck-b__light">
        <div className="header__container container">
          <div className="header__left">
            <div className="header__logo">
              <Link to="/">CHAIR</Link>
            </div>
          </div>
          <div className="header__right">
            <div className="nav">{this.showLinks(this.state.page)}</div>
            <div className="account">{this.showLinks(this.state.user)}</div>
          </div>
          <div />
        </div>
      </header>
    );
  }
}

// because the Layout component is outside the authenticatet routes
// need to connect to redux to get the userData
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(withRouter(Header));
