/**
 * CARD CONTAINER FOR SHOP
 * ======================
 */

import React from 'react';
import Card from './Card';

const CardBlock = props => {
  // render all cards
  const renderCards = () =>
    props.list
      ? props.list.map(card => (
          <Card key={card._id} {...card} grid={props.grid} />
        ))
      : null;

  return (
    <div className="card-block-shop">
        {props.list ? (
          props.list.length === 0 ? (
            <div className="card-block__no-result">Sorry, no results</div>
          ) : null
        ) : null}
        {renderCards(props.list)}
    </div>
  );
};

export default CardBlock;
