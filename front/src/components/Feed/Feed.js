import React, { useEffect } from 'react';

import ShortNeoTalk from '../NeoTalk/ShortNeoTalk/ShortNeoTalk';

import styles from './Feed.module.css';
import { getFeedPromise, isAuthorized } from '../../services/api';

const createShortNeoTalk = (el) => <ShortNeoTalk key={el.id} feed_element={el} />;

function Feed() {
  const [feed, setFeed] = React.useState([]);

  const requestFeed = async () => {
    const currentFeed = await getFeedPromise();
    console.log(currentFeed);
    setFeed(currentFeed);
  };

  useEffect(() => {
    requestFeed();
  }, []);

  return <div className="neotalks">{feed.map(createShortNeoTalk)}</div>;
}

export default Feed;
