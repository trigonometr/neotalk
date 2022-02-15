import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserID } from '../../actions/userID';

import styles from './Main.module.css';

import Header from '../Header/Header';
import UserMenu from '../UserMenu/UserMenu';
import { isAuthorized, requestUserID } from '../../services/api';

function Main() {
  const dispatch = useDispatch();
  useEffect(async () => {
    const response = await requestUserID();
    dispatch(setUserID(response.user_id));
  }, []);

  return (
    <div>
      <Header></Header>
      <div className={styles['main']}>
        <div className={styles['main-content'] + ' ' + styles['container']}>
          <UserMenu></UserMenu>
          <div className={styles['feed-body']}>
            <Outlet />
          </div>
          <div className={styles['main-TODO']}></div>
        </div>
      </div>
    </div>
  );
}

export default Main;
