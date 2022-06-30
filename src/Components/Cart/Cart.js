import React, { useEffect } from 'react';
import styles from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  RemoveOneItem,
  addToCart,
  clearCart,
  getTotals,
} from '../../features/cartSlice';

export function Cart() {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const { isLoggedIn } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems]);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const removeOne = (product) => {
    dispatch(RemoveOneItem(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.cartItems}>
      <h2 className={styles.cartItemsTitle}> Shopping Cart </h2>
      <div className={styles.cartItemsReset}>
        {cartItems.length >= 1 && (
          <button className={styles.clearCart} onClick={clearCartItems}>
            Clear Cart
          </button>
        )}
      </div>
      {cartItems.length === 0 && (
        <div className={styles.cartItemsEmpty}>
          {' '}
          {isLoggedIn ? 'Cart is empty' : 'Please log in to shop'}.
        </div>
      )}
      <div>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItemsList}>
            <img
              className={styles.cartItemsImage}
              src={item.images}
              alt={item.title}
            />
            <div className={styles.cartItemsName}>{item.title}</div>
            <div className={styles.cartItemsFunction}>
              <button
                className={styles.cartItemsAdd}
                onClick={() => handleAddToCart(item)}
              >
                {' '}
                +{' '}
              </button>
              <button
                className={styles.cartItemsRemove}
                onClick={() => removeOne(item)}
              >
                {' '}
                -{' '}
              </button>
            </div>
            <div className={styles.cartItemsPrice}>
              {item.quantity} x {item.price}$
            </div>
            <div className={styles.removeItem}>
              <button
                class='fa-solid fa-xmark'
                onClick={() => handleRemoveFromCart(item)}
              ></button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartItemsTotalPriceTitle}>
        Total price
        <div className={styles.cartItemsTotalPrice}>
          ${cartTotalAmount} for {cartTotalQuantity} items
        </div>
        {isLoggedIn && cartItems.length > 0 ? (
          <div className={styles.checkoutBtn}>
            <button>Proceed Checkout</button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
