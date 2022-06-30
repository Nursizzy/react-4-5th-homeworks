import React, { useState } from 'react';
import { setHidden } from '../../features/modalSlice';
import styles from './ModalWindow.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setLoggedIn } from '../../features/currentUser';

const initialValues = {
  email: '',
  password: '',
};

export function Modal() {
  const [userInput, setUserInput] = useState(initialValues);
  const [loginError, setLoginError] = useState('');
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  function setValue(name, value) {
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onChange(e, name) {
    const { value } = e.target;
    setValue(name, value.toLowerCase());
  }

  function resetModal() {
    dispatch(setHidden());
  }

  function onSubmitModal(e) {
    e.preventDefault();
    const IsValid = users.filter(
      (obj) =>
        obj.email === userInput.email && obj.password === userInput.password
    );

    if (IsValid[0]?.email === userInput.email) {
      console.log(IsValid);
      dispatch(setCurrentUser(IsValid[0]));
      dispatch(setHidden());
      dispatch(setLoggedIn());
    } else {
      setLoginError('Incorrect email or password');
      console.log(loginError);
    }
  }

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        onSubmitModal(e);
      }}
    >
      Authorization
      <div className={styles.inputContainer}>
        <label>Email</label>
        {loginError ? (
          <div className={styles.loginError}>{loginError}</div>
        ) : (
          ''
        )}
        <input
          type='email'
          className={styles.inputStyle}
          value={userInput.email}
          onChange={(e) => onChange(e, 'email')}
          required
        />
        <label>Password</label>
        <input
          type='password'
          className={styles.inputStyle}
          value={userInput.password}
          onChange={(e) => onChange(e, 'password')}
          required
        />
      </div>
      <div className={styles.buttonContainer}>
        <button type='submit' className={styles.buttonStyle}>
          Login
        </button>
        <button
          type='reset'
          className={styles.buttonStyle}
          onClick={resetModal}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
