import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './UserMenu.module.css';

import home_icon from '../../img/home.svg';
import categories_icon from '../../img/categories.svg';
import empty_heart from '../../img/empty_heart.svg';
import heart from '../../img/heart.svg';
import profile_icon from '../../img/profile.svg';
import more_icon from '../../img/more.svg';
import create_icon from '../../img/create.svg';
import { profileURL } from '../../services/neotalk';
import { isAuthorized } from '../../services/api';
import { setAuth } from '../../actions/auth';

const setActive = ({ isActive }) => ({ fontWeight: isActive ? '900' : '400' });

function UserMenu() {
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.getAuth.auth);
  const [activeHeart, setActiveHeart] = useState(false);
  const userID = useSelector((state) => state.getUserID.userID);
  const activatedHeart = useSelector((state) => state.bookmarksState.bookmarks_state);

  useEffect(async () => {
    const response = await isAuthorized();
    dispatch(setAuth(response));
  }, []);

  return (
    <div className={styles['menu-wrapper']}>
      <div className={styles['menu-body']}>
        <NavLink to="/home" style={setActive}>
          <div className={styles['home'] + ' ' + styles['menu-element']}>
            <img src={home_icon} alt="home" height="25" width="25"></img>
            <span>Home</span>
          </div>
        </NavLink>
        <NavLink to="/categories" style={setActive}>
          <div className={'categories' + ' ' + styles['menu-element']}>
            <img src={categories_icon} alt="categories" height="25" width="25"></img>
            <span>Categories</span>
          </div>
        </NavLink>
        {authorized && (
          <NavLink to="/bookmarks" style={setActive}>
            <div
              className={styles['bookmarks'] + ' ' + styles['menu-element']}
              onMouseEnter={() => setActiveHeart(true)}
              onMouseLeave={() => setActiveHeart(false)}>
              <img
                className={'empty-heart ' + styles[String(!activatedHeart && !activeHeart)]}
                src={empty_heart}
                alt="bookmarks"
                height="25"
                width="25"></img>
              <img
                className={'colored-heart ' + styles[String(activatedHeart || activeHeart)]}
                src={heart}
                alt="bookmarks"
                height="25"
                width="25"></img>
              <span>Bookmarks</span>
            </div>
          </NavLink>
        )}
        {authorized && (
          <NavLink to={profileURL(userID)} style={setActive}>
            <div className={'profile' + ' ' + styles['menu-element']}>
              <img src={profile_icon} alt="profile" width="25" height="25"></img>
              <span>Profile</span>
            </div>
          </NavLink>
        )}
        <NavLink to="/more">
          <div className={'more' + ' ' + styles['menu-element']}>
            <img src={more_icon} alt="more" width="25" height="25"></img>
            <span>More</span>
          </div>
        </NavLink>
        {authorized && (
          <NavLink to="/create-neo-talk" style={setActive}>
            <div className={styles['create']}>
              <img src={create_icon} alt="create" width="25" height="25"></img>
              <span>Create NeoTalk</span>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default UserMenu;
