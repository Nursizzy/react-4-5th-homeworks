import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import loader from '../../loader.svg';

export function Home() {
  const { items, itemsStatus } = useSelector((state) => state.products);
  const { isLoggedIn } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  console.log(items);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div className={styles.homeimagecontainer}>
        <h1 className={styles.imageText}>
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at..."
        </h1>
        <button className={styles.aboutBtn}>
          {' '}
          <Link to='/about'>Read more</Link>
        </button>
      </div>
      {itemsStatus === 'pending' ? (
        <div className={styles.loader}>
          <img src={loader} />
        </div>
      ) : (
        <div className={styles.products}>
          {items.map((products) => (
            <div className={styles.card} key={products.id}>
              <div className={styles.imageContainer}>
                <img
                  className={styles.productImage}
                  src={products.images}
                  alt={products.title}
                />
              </div>
              <div>
                <Link to={`/products/${products.title}`}>
                  <h3 className={styles.productTitle}>
                    {products.title.slice(0, 24)}
                  </h3>
                </Link>
              </div>
              <div className={styles.productPrice}>Price:{products.price}$</div>
              <div>
                {!isLoggedIn ? (
                  <button className={styles.productBtnDisabled}>
                    Please log in <i class='fa-solid fa-ban' />
                  </button>
                ) : products.stock > 0 ? (
                  <button
                    className={styles.productBtn}
                    onClick={() => handleAddToCart(products)}
                  >
                    Add to Cart <i class='fa-solid fa-cart-arrow-down' />
                  </button>
                ) : (
                  <button className={styles.productBtnDisabled}>
                    Out of Stock <i class='fa-solid fa-ban' />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
