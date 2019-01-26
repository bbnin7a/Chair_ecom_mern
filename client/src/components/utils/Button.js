/**
 * CUSTOM BUTTON
 * =============
 * > Reuse component
 * > Type of button:
 * > Props: linkTo, addStyles, type, title
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Button = props => {

  // return an customized button depends on receiving props
  const renderButton = () => {
    let template = '';
    
    // check the type of button
    switch (props.type) {
      case 'default':
        template = <Link className="button--link-default" to={props.linkTo} {...props.addStyles}>{props.title}</Link>;
        break;
      default:
        template = '';
    }

    return template;
  };

  return <div className="button--link">{renderButton()}</div>;
};

export default Button;
