import React, { useState } from 'react';
import styles from './CreateNeoTalkForm.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import { getConstructorPromise } from '../../services/api';
import { useNavigate } from 'react-router';
import { neotalkURL } from '../../services/neotalk';

const blurHandler = (e) => {
  e.target.parentNode.style.border = '2px solid rgba(169, 188, 255, 0.65)';
};

const focusHandler = (e) => {
  e.target.parentNode.style.border = '2px solid rgba(169, 188, 255, 1)';
};

const clickHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const [textArea] = e.currentTarget.childNodes;
  textArea.focus();
};

function CreateNeoTalkForm() {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const submitCreateForm = async (e) => {
    e.preventDefault();

    if (category && text) {
      const response = await getConstructorPromise({ category, text });
      navigate(neotalkURL(response.id), { replace: true });
    } else {
      setError('Fields may not be blank');
    }
  };

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-content']}>
        <div className={styles['name']}>
          <label>NeoTalk Constructor</label>
        </div>
        <div className={styles['form-category']}>
          <label>Category</label>
          <div
            className={styles['div-input-category'] + ' ' + styles['txt']}
            onClick={clickHandler}>
            <TextareaAutosize
              className={styles['txt-category']}
              onChange={(e) => setCategory(e.target.value)}
              placeholder={'Set category'}
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </div>
        </div>
        <div className={styles['form-text']}>
          <label>Post text</label>
          <div className={styles['div-input-text'] + ' ' + styles['txt']} onClick={clickHandler}>
            <TextareaAutosize
              className={styles['txt-text']}
              placeholder={'Here you can type all you want'}
              onChange={(e) => setText(e.target.value)}
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </div>
        </div>
        <div className={styles['submit']} onClick={submitCreateForm}>
          Submit
        </div>
      </div>
      <div className={styles['error']}>{error}</div>
    </div>
  );
}

export default CreateNeoTalkForm;
