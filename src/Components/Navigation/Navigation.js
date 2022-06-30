import React, { useEffect } from 'react';
import logo from '../../logo.svg';
import { Modal } from '../Modal/ModalWindow';
import { Link, Outlet } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, getTotals } from '../../features/cartSlice';
import { setLoggedOut } from '../../features/currentUser';
import { setReveal } from '../../features/modalSlice';

export function Navigation() {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const { isLoggedIn, currentUser } = useSelector((state) => state.currentUser);
  const { modalIsHidden } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems]);

  function loginClick() {
    dispatch(setReveal());
  }

  function handleLogOut() {
    dispatch(setLoggedOut());
    dispatch(clearCart());
  }
  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.homeContainer}>
          <ul>
            <li>
              <Link to='/'>home</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to='/about'>about us</Link>
            </li>
          </ul>
        </div>
        <div className={styles.logo}>
          <img src={logo} className={styles.appLogo} alt='logo' />
          <Link to='/' className={styles.logoText}>
            react shop
          </Link>
        </div>
        <div className={styles.navigation}>
          <ul>
            <li className={styles.loginBtn}>
              {!isLoggedIn ? (
                <i
                  style={{ color: '#8dc891' }}
                  class='fa-solid fa-arrow-right-to-bracket'
                  onClick={loginClick}
                />
              ) : (
                <div className={styles.authorization}>
                  <ul>
                    <li>
                      <h4>
                        Hello,{' '}
                        <span style={{ color: '#8dc891' }}>
                          {currentUser.name}
                        </span>
                      </h4>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to='/cart' className={styles.cart}>
                        <i class='fa-solid fa-cart-shopping' />
                        <span className={styles.cartLenght}>
                          {cartItems.length === 0 ? 0 : cartTotalQuantity}
                        </span>
                        <span className={styles.cartBrief}>
                          {' '}
                          for{' '}
                          <span style={{ color: '#8dc891' }}>
                            {cartTotalAmount}$
                          </span>{' '}
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <div className={styles.logOut}>
                        <i
                          style={{ color: '#fc929e' }}
                          class='fa-solid fa-arrow-right-from-bracket'
                          title='LogOut'
                          onClick={() => handleLogOut()}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      {modalIsHidden ? (
        ''
      ) : (
        <>
          <div className={styles.overlay}>Overlay</div>
          <div className={styles.modalContainer}>
            <Modal />
          </div>{' '}
        </>
      )}
    </>
  );
}
