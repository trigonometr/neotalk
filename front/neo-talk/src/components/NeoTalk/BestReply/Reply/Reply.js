import React, { useState } from 'react';

import styles from '../../NeoTalk.module.css';
import { useLocation, useNavigate } from 'react-router';

import reply_icon from '../../../../img/reply.svg';
import profile_photo2 from '../../../../img/d3br4.png';
import like_icon from '../../../../img/like.svg';
import dislike_icon from '../../../../img/dislike.svg';
import { profileURL, setParagraphs, timeAgo } from '../../../../services/neotalk';
import { updateCreateRate, removeRate } from '../../../../services/api';
import { neotalkURL } from '../../../../services/neotalk';
import { useDispatch, useSelector } from 'react-redux';
import { setOnReply } from '../../../../actions/reply';

const stats = { LIKED: true, DISLIKED: false, NOT_RATED: null };

function Reply(props) {
  const liked = props.user_rate === stats.LIKED;
  const disliked = props.user_rate === stats.DISLIKED;

  let navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.getAuth.auth);
  const replying = useSelector((state) => state.getReplying.replying);
  const [state, setState] = useState(props.user_rate);
  const [likesState, setLikesState] = useState(liked ? 'active' : 'inactive');
  const [dislikesState, setDislikesState] = useState(disliked ? 'active' : 'inactive');

  const statHandler = (action) => {
    if (action === stats.LIKED && state === action) {
      setState(stats.NOT_RATED);
      setLikesState('inactive');
      removeRate(props.id);
    } else if (action === stats.DISLIKED && state === action) {
      setState(stats.NOT_RATED);
      setDislikesState('inactive');
      removeRate(props.id);
    } else if (action === stats.LIKED && state === stats.NOT_RATED) {
      setState(stats.LIKED);
      setLikesState('active');
      updateCreateRate(props.id, stats.LIKED);
    } else if (action === stats.LIKED && state === stats.DISLIKED) {
      setState(stats.LIKED);
      setLikesState('active');
      setDislikesState('inactive');
      updateCreateRate(props.id, stats.LIKED);
    } else if (action === stats.DISLIKED && state === stats.NOT_RATED) {
      setState(stats.DISLIKED);
      setDislikesState('active');
      updateCreateRate(props.id, stats.DISLIKED);
    } else if (action === stats.DISLIKED && state === stats.LIKED) {
      setState(stats.DISLIKED);
      setLikesState('inactive');
      setDislikesState('active');
      updateCreateRate(props.id, stats.DISLIKED);
    }
  };

  const likeClickHandler = (e) => {
    if (!authorized) {
      return;
    }

    statHandler(stats.LIKED);
  };

  const dislikeClickHandler = (e) => {
    if (!authorized) {
      return;
    }

    statHandler(stats.DISLIKED);
  };

  const replyClickHandler = () => {
    if (!authorized) {
      return;
    }

    dispatch(
      setOnReply({
        reply_to_id: props.id,
        reply_to_username: props.user.username,
        post_id: props.post.id,
      }),
    );
    if (location.pathname === '/home') {
      navigate(neotalkURL(props.post.id));
    }
  };

  return (
    <div className={styles['best-answer']}>
      <div className={styles['answer-creation-info'] + ' ' + styles['info-container']}>
        <div className={styles['creator-img-container']}>
          <img
            className={styles['creator-img']}
            src={profile_photo2}
            alt="creator-img"
            height="36"
            width="36"></img>
        </div>
        <div className={styles['info']}>
          <p
            className={styles['creator-id']}
            onClick={(e) => navigate(profileURL(props.user.id), { replace: 'true' })}>
            {setParagraphs(props.user.username)}
          </p>
          <p className={styles['time']}>{timeAgo(props.creation_time)}</p>
        </div>
        <div className={styles['reply-to']}>
          {props.reply_to ? 'reply to ' + props.reply_to.user.username : null}
        </div>
      </div>
      <div className={styles['answer-text-container']}>
        <div className={styles['answer-text']}>
          <p className={styles['text']}>{props.text}</p>
        </div>
      </div>
      <div className={styles['answer-stats'] + ' ' + styles['stats-container']}>
        {/* props.is_owner && (
          <div className={styles['interaction-panel']}>
            <p>Delete</p>
          </div>
        ) */}
        <div className={'answer-reply ' + styles['stat-container']} onClick={replyClickHandler}>
          <img
            className={styles['reply']}
            src={reply_icon}
            height="14"
            width="14"
            alt="reply"></img>
        </div>
        <div
          className={'answer-likes ' + styles['stat-container'] + ' ' + styles[likesState]}
          onClick={likeClickHandler}>
          <img className={styles['like']} src={like_icon} height="14" width="14" alt="like"></img>
          <span className={'like-num ' + styles['stat-num']}>
            {props.likes + (likesState === 'active') - liked}
          </span>
        </div>
        <div
          className={'answer-dislikes ' + styles['stat-container'] + ' ' + styles[dislikesState]}
          onClick={dislikeClickHandler}>
          <img className={'dislike'} src={dislike_icon} height="14" width="14" alt="dislike"></img>
          <span className={'dislike-num ' + styles['stat-num']}>
            {props.dislikes + (dislikesState === 'active') - disliked}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Reply;
