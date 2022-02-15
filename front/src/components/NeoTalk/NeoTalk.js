import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Topic from './Topic/Topic';
import Reply from './BestReply/Reply/Reply';
import CreateReply from './CreateReply/CreateReply';

import styles from './NeoTalk.module.css';
import { getNeotalkPromise } from '../../services/api';
import { useParams } from 'react-router';
import { changeReplies } from '../../actions/set_replies';

const createReply = (el) => <Reply {...el} />;

function NeoTalk() {
  const dispatch = useDispatch();
  const { neotalkID } = useParams();
  const [neotalk, setNeotalk] = React.useState(null);
  const replying = useSelector((state) => state.getReplying.replying);
  const replies = useSelector((state) => state.setReplies.payload);

  const requestNeotalk = async () => {
    const currentNeotalk = await getNeotalkPromise(neotalkID);
    setNeotalk(currentNeotalk);
    dispatch(changeReplies(currentNeotalk.replies_set));
  };

  useEffect(async () => {
    requestNeotalk();
  }, []);

  return (
    neotalk !== null && (
      <div>
        <div className={styles['neo-talk-container']}>
          <div className={styles['neo-talk-content']}>
            <Topic {...neotalk}></Topic>
            {replies.map(createReply)}
          </div>
        </div>
        {replying && <CreateReply className={styles['reply-form']} />}
      </div>
    )
  );
}

export default NeoTalk;
