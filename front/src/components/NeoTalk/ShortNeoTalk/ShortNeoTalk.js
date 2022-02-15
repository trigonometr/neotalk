import React, { useState } from 'react';
import Topic from '../Topic/Topic';
import BestReply from '../BestReply/BestReply';

import styles from '../NeoTalk.module.css';

function NeoTalk(props) {
  return (
    <div className={styles['neo-talk-container']}>
      <div className={styles['neo-talk-content']}>
        <Topic {...props.feed_element} />
        <BestReply {...props.feed_element.best_reply[0]} />
      </div>
    </div>
  );
}

export default NeoTalk;
