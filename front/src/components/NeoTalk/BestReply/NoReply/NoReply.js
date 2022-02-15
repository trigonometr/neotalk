import React from 'react';

import styles from '../../NeoTalk.module.css';

function NoReply(props) {
  return (
    <div className={styles['no-answers']}>
      <p className={styles['no-answers-text']}>No answers here yet, be the first</p>
    </div>
  );
}

export default NoReply;
