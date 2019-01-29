/**
 * CUSTOM BUTTON
 * =============
 */

import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBasket from '@fortawesome/fontawesome-free-solid/faShoppingBasket';

const Button = props => {
  // return an customized button depends on receiving props
  const renderButton = () => {
    let template = '';

    // check the type of button
    switch (props.type) {
      case 'default':
        template = (
          <Link
            className={
              !props.altClass ? 'button--link-default' : props.altClass
            }
            to={props.linkTo}
            {...props.addStyles}
          >
            {props.title}
          </Link>
        );
        break;
      case 'bag_link':
        template = (
          <div className="button--link-bag" onClick={()=> props.runAction()}>
            <FontAwesomeIcon icon={faShoppingBasket} />
          </div>
        );
        break;
      case 'add_to_cart_link':
        template = (
          <div className="button--link--addtocart" onClick={()=> props.runAction()}>
            <FontAwesomeIcon icon={faShoppingBasket} /> Add to cart
          </div>
        );
        break;
      default:
        template = '';
    }

    return template;
  };

  return <div>{renderButton()}</div>;
};

export default Button;
