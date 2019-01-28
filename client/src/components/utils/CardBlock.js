/**
 * CARD CONTAINER
 * ==============
 */

import React from 'react';
import Card from './Card';

const CardBlock = props => {
  // render all cards
  const renderCards = () =>
    props.list ? props.list.map((card, i) => <Card key={i} {...card} />) : null;

  return (
    <div className="card-block">
      <div className="container">
        {props.title ? (
          <div className="card-block__title">{props.title}</div>
        ) : null}
        <div className="card-block__card-container">
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
