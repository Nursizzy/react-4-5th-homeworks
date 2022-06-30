import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';

export function ProductPage() {
  const { items, itemsStatus } = useSelector((state) => state.products);
  const { isLoggedIn } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  let params = useParams();

  if (itemsStatus === 'pending')
    return <div className={styles.products}>Loading...</div>;
  if (itemsStatus === 'rejected') return 'Error!';

  return (
    <div className={styles.productPageContainer}>
      {items
        .filter((objects) => objects.title === params.productId)
        .map((products) => (
          <div className={styles.productInfo} key={products.id}>
            <div>
              <img
                className={styles.productInfoImage}
                src={products.images}
                alt={products.title}
              />
            </div>

            <div className={styles.productInfoDescription}>
              <div className={styles.descriptionContainer}>
                <h1 className={styles.descriptionTitle}>
                  Product description:{' '}
                </h1>
                <p className={styles.descriptionText}>
                  {' '}
                  {products.description}
                </p>
              </div>

              <div className={styles.productInfoPurchase}>
                <div className={styles.productInfoPrice}>
                  Price:{products.price}$
                </div>
                <div className={styles.purchaseBtn}>
                  {!isLoggedIn ? (
                    <button className={styles.productBtnDisabled}>
                      Please log in to shop <i class='fa-solid fa-ban'></i>
                    </button>
                  ) : (
                    <div className={styles.cartAndCounter}>
                      {' '}
                      <button
                        className={styles.productBtn}
                        onClick={() => handleAddToCart(products)}
                      >
                        Add to Cart <i class='fa-solid fa-cart-arrow-down'></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
