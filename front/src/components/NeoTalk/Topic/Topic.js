import React, { useState } from 'react';

import styles from '../NeoTalk.module.css';
import { timeAgo, setParagraphs, profileURL } from '../../../services/neotalk';
import { useNavigate, useLocation } from 'react-router';

import reply_icon from '../../../img/reply.svg';
import heart_icon from '../../../img/heart.svg';
import empty_heart_icon from '../../../img/empty_heart.svg';
import profile_photo1 from '../../../img/d3xt3r.jpg';
import { createBookmark, removeBookmark, isAuthorized } from '../../../services/api';
import { neotalkURL } from '../../../services/neotalk';
import { useDispatch, useSelector } from 'react-redux';
import { setOnReply } from '../../../actions/reply';
import { useEffect } from 'react/cjs/react.development';

function Topic(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.getAuth.auth);
  const replying = useSelector((state) => state.getReplying.replying);
  const location = useLocation();
  const [activatedHeart, setHeartActivated] = useState(props.liked);
  const [activeHeart, setHeartActive] = useState(false);

  const heartClickHandler = () => {
    if (!authorized) {
      return;
    }

    setHeartActivated(!activatedHeart);
    if (activatedHeart) {
      removeBookmark(props.id);
    } else {
      createBookmark(props.id);
    }
  };

  const replyClickHandler = () => {
    if (!authorized) {
      return;
    }

    dispatch(setOnReply({ reply_to_id: null, reply_to_username: null, post_id: props.id }));
    if (location.pathname === '/home') {
      navigate(neotalkURL(props.id));
    }
  };

  return (
    <div className={styles['topic']}>
      <div className={'topic-creation-info ' + styles['info-container']}>
        <div className={styles['creator-img-container']}>
          <img
            className={styles['creator-img']}
            src={profile_photo1}
            alt="creator-img"
            height="45"
            width="45"></img>
        </div>
        <div className={styles['info']}>
          <p
            className={styles['creator-id']}
            onClick={(e) => navigate(profileURL(props.user.id), { replace: 'true' })}>
            {props.user ? props.user.username : ''}
          </p>
          <p className={styles['time']}>{timeAgo(props.creation_time)}</p>
        </div>
        <div className={styles['topic-category']}>
          <p>{props.category}</p>
        </div>
      </div>
      <div className={styles['topic-text-container']}>
        <div
          className={styles['topic-text']}
          onClick={() => navigate(neotalkURL(props.id), { replace: true })}>
          <p className={styles['text']}>{setParagraphs(props.text)}</p>
        </div>
      </div>
      <div className={'topic-stats ' + styles['stats-container']}>
        {/* props.is_owner && (
          <div className={styles['interaction-panel']}>
            <p>Delete</p>
          </div>
        ) */}
        <div className={'topic-reply ' + styles['stat-container']} onClick={replyClickHandler}>
          <img
            className={styles['reply']}
            src={reply_icon}
            height="16"
            width="16"
            alt="reply"></img>
          <span className={'reply-num ' + styles['stat-num']}>{props.replies}</span>
        </div>
        <div
          className={'topic-likes ' + styles['stat-container']}
          onMouseEnter={() => setHeartActive(true)}
          onMouseLeave={() => setHeartActive(false)}
          onClick={heartClickHandler}>
          <img
            className={'empty_like ' + styles[String(!activeHeart && !activatedHeart)]}
            src={empty_heart_icon}
            height="16"
            width="16"
            alt="empty_heart"></img>
          <img
            className={'like ' + styles[String(activeHeart || activatedHeart)]}
            src={heart_icon}
            height="16"
            width="16"
            alt="heart"></img>
          <span className={'like-num ' + styles['stat-num']}>
            {props.likes + (activatedHeart - props.liked)}
          </span>
        </div>
      </div>
      <div className={styles['topic-border']}></div>
    </div>
  );
}

export default Topic;
