import React, { useEffect } from 'react';

import ShortNeoTalk from '../NeoTalk/ShortNeoTalk/ShortNeoTalk';

import styles from './Bookmarks.module.css';
import { getBookmarksPromise } from '../../services/api';
import { useDispatch } from 'react-redux';
import { setBookmarksActive, setBookmarksInactive } from '../../actions/bookmarksState';

const createShortNeoTalk = (el) => <ShortNeoTalk key={el.id} feed_element={el} />;

function Bookmarks() {
  const dispatch = useDispatch();
  const [bookmarks, setBoookmarks] = React.useState([]);

  const requestBookmarks = async () => {
    const currentBookmarks = await getBookmarksPromise();
    setBoookmarks(currentBookmarks);
  };

  useEffect(() => {
    dispatch(setBookmarksActive());
    requestBookmarks();

    return () => {
      dispatch(setBookmarksInactive());
    };
  }, []);

  return <div className={styles['bookmarks-body']}>{bookmarks.map(createShortNeoTalk)}</div>;
}

export default Bookmarks;
