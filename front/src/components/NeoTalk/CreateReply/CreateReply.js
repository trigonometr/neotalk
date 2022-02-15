import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '../NeoTalk.module.css';
import sendImg from '../../../img/send.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getReplyPromise } from '../../../services/api';
import { pushReply } from '../../../actions/set_replies';

function CreateReply() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { replying, reply_to_id, reply_to_username, post_id } = useSelector(
    (state) => state.getReplying,
  );

  useEffect(() => {
    if (reply_to_username) {
      setText(reply_to_username + ', ');
    }

    const element = document.getElementsByClassName(styles['create-reply-text'])[0];
    element.focus();
    return window.scroll(0, document.body.offsetHeight);
  }, []);

  const sendHandle = async () => {
    if (!text) {
      return;
    }

    try {
      let reply_to;
      if (reply_to_id) {
        reply_to = { id: reply_to_id, user: null };
      } else {
        reply_to = { id: null, user: null };
      }
      const response = await getReplyPromise({
        reply_to,
        text,
        post: { id: post_id },
      });
      if (response) {
        dispatch(pushReply(response));
        const element = document.getElementsByClassName(styles['create-reply-text'])[0];
        setText('');
        element.focus();
        window.scroll(0, document.body.offsetHeight);
      }
    } catch (err) {
      // smth
    }
  };

  return (
    <div className={styles['create-reply-container']}>
      {reply_to_id && (
        <div className={styles['reply-to']}>
          <p>{`Replying to ${reply_to_username}`}</p>
        </div>
      )}
      <div className={styles['reply-form']}>
        <div className={styles['text-wrapper']}>
          <TextareaAutosize
            className={styles['create-reply-text']}
            maxLength={1000}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className={styles['send']} onClick={sendHandle}>
          <img className={styles['send-img']} src={sendImg} height="32" width="32"></img>
        </div>
      </div>
    </div>
  );
}

export default CreateReply;
