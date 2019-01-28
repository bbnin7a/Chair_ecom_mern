import React from 'react';
import CardBlockShop from '../utils/CardBlockShop';

const LoadMoreCards = props => {
  return (
    <div>
      <CardBlockShop grid={props.grid} list={props.products} />

      {/* 
        if fetched result is larger than limit, will display the load more button 
        else show nothing
      */}
      
      {props.size > 0 && props.size >= props.limit ? (
        <div className="load-more__container">
          <span onClick={() => props.loadMore()}>LOAD MORE ...</span>
        </div>
      ) : null}
    </div>
  );
};

export default LoadMoreCards;
