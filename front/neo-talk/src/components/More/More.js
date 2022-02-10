import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react/cjs/react.development';
import { setAuth } from '../../actions/auth';
import { isAuthorized } from '../../services/api';

import styles from './More.module.css';

function More() {
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.getAuth.auth);
  let navigate = useNavigate();

  const login = () => {
    navigate('/login', { replace: true });
  };

  const logout = () => {
    window.localStorage.clear();
    dispatch(setAuth(false));
    navigate('/login', { replace: true });
  };

  return (
    <div>
      {!authorized && (
        <div className={styles['login-button']} onClick={login}>
          <p>Login</p>
        </div>
      )}
      {authorized && (
        <div className={styles['logout-button']} onClick={logout}>
          <p>Logout</p>
        </div>
      )}
    </div>
  );
}

export default More;
