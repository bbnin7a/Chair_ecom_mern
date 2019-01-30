import React from 'react';

const UserProductBlock = ({ products, removeItem, updateItemQty }) => {
  // render the product images
  const renderCartImages = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_available.png';
    }
  };

  // render list of items
  const renderItems = () => {
    const { cartDetail } = products;

    return cartDetail ? cartDetail.map(product => (
            <div key={product._id} className="user-product__block">
              <div className="user-product__block__item">
                <div
                  className="image"
                  style={{
                    background: `url(${renderCartImages(
                      product.images
                    )}) no-repeat`
                  }}
                />
              </div>
              <div className="user-product__block__item">
                <h4>Product Name</h4>
                <div>
                  {product.brand.name} - {product.name}
                </div>
                <div>$ {product.price}</div>
              </div>
              <div className="user-product__block__item center">
                <h4>Quantity</h4>
                <div className="user-product__actions">
                  <div
                    className="minus"
                    onClick={() => updateItemQty(product._id, '-')}
                  >
                    -
                  </div>
                  <div>{product.quantity}</div>
                  <div
                    className="plus"
                    onClick={() => updateItemQty(product._id, '+')}
                  >
                    +
                  </div>
                </div>
              </div>
              <div className="user-product__block__item center">
                <h4>Price</h4>
                <div>$ {product.price * product.quantity}</div>
              </div>
              <div className="user-product__block__item button">
                <div
                  className="cart-remove-button"
                  onClick={() => removeItem(product._id)}
                >
                  Remove
                </div>
              </div>
            </div>
          ) 
        )
      : null;
  };

  return <div>{renderItems()}</div>;
};

export default UserProductBlock;
