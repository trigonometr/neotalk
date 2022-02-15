import React from 'react';

import styles from './Header.module.css';

import logo from '../../img/NeoTalkLogo.svg';
import search_icon from '../../img/search.svg';
import cross_icon from '../../img/cross.svg';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setResults, clearResults } from '../../actions/search';
import { requestSearchResults } from '../../services/api';

function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const searchBarChange = async (e) => {
    const deleteButton = document.getElementsByClassName(styles['delete-image'])[0];
    if (e.target.value !== '') {
      const searchResults = await requestSearchResults(e.target.value);
      dispatch(setResults(searchResults));
      navigate('/search', { replace: true });
      deleteButton.style.visibility = 'visible';
    } else {
      dispatch(clearResults());
      deleteButton.style.visibility = 'hidden';
    }
  };

  const clearInput = (e) => {
    const searchBar = document.getElementsByClassName(styles['search-txt'])[0];
    searchBar.value = '';
    searchBar.focus();
    e.target.style.visibility = 'hidden';
  };

  return (
    <div className={styles['header']}>
      <div className={styles['header-content'] + ' ' + styles['container']}>
        <div
          className={styles['header-logo'] + ' ' + styles['header-section']}
          onClick={() => navigate('/home', { replace: true })}>
          <img src={logo} alt="logo" width="87" height="45"></img>
        </div>
        <div className={styles['search-box'] + ' ' + styles['header-section']}>
          <div className={styles['header-search-box-content']}>
            <img
              className={styles['search-image']}
              src={search_icon}
              alt="search"
              width="15"
              height="15"></img>
            <input
              className={styles['search-txt']}
              type="text"
              name="search"
              placeholder="Search..."
              onChange={searchBarChange}></input>
            <img
              className={styles['delete-image']}
              src={cross_icon}
              alt="delete"
              width="20"
              height="20"
              onClick={clearInput}></img>
          </div>
        </div>
        <div className={styles['header-TODO'] + ' ' + styles['header-section']}></div>
      </div>
    </div>
  );
}

export default Header;
