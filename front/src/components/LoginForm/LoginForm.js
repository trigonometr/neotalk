import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './LoginForm.module.css';

import logo from '../../img/NeoTalkLogo.svg';
import { isAuthorized, loginRequest } from '../../services/api';
import { changeElem } from '../../services/changer';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../actions/auth';

const default_settings = {
  style: {
    padding: '0 0 0 0',
    position: 'absolute',
    transform: 'translateY(50%)',
    color: '#a9a7ab',
    pointerEvents: 'none',
    transition: '0.25s',
    fontSize: '15px',
  },
  color: 'rgba(169, 188, 255, 0.65)',
};

const new_settings = {
  style: {
    ...default_settings.style,
    color: 'rgba(149, 172, 255, 1)',
    transform: 'translateY(10%)',
    fontSize: '11px',
  },
  color: 'rgba(169, 188, 255, 1)',
};

function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usrnameStyle, setUsrnameStyle] = useState(default_settings.style);
  const [passwordStyle, setPasswordStyle] = useState(default_settings.style);

  let navigate = useNavigate();

  const usrnameBlurHandler = (e) => {
    if (e.target.value === '') {
      changeElem('usrname-login-div', setUsrnameStyle, default_settings);
    }
  };
  const passwordBlurHandler = (e) => {
    if (e.target.value === '') {
      changeElem('password-login-div', setPasswordStyle, default_settings);
    }
  };

  const submitCreds = async (e) => {
    e.preventDefault();

    loginRequest({ username, password }, navigate, setError);
  };

  useEffect(async () => {
    const result = await isAuthorized();
    if (result) {
      dispatch(setAuth(result));
      navigate('/home', { replace: true });
    }
  }, []);

  useEffect(() => {
    setError('');
  }, [username, password]);

  return (
    <div className={styles['login-form']}>
      <div className={styles['login-logo']}>
        <Link to="/home">
          <img className={styles['login-NeoTalk']} src={logo} alt="logo"></img>
        </Link>
      </div>
      <form onSubmit={submitCreds}>
        <div className={styles['inner-login-form']}>
          <div
            className={'usrname-login-div ' + styles['login-form-group']}
            onClick={() => {
              document.getElementsByClassName('usrname-login-input')[0].focus();
            }}>
            <label style={usrnameStyle} className={styles['usrname-login-label']}>
              Login
            </label>
            <input
              type="text"
              className="usrname-login-input"
              onFocus={() => {
                changeElem('usrname-login-div', setUsrnameStyle, new_settings);
              }}
              onInput={() => {
                changeElem('usrname-login-div', setUsrnameStyle, new_settings);
              }}
              onBlur={usrnameBlurHandler}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div
            className={'password-login-div ' + styles['login-form-group']}
            onClick={() => {
              document.getElementsByClassName('password-login-input')[0].focus();
            }}>
            <label
              style={passwordStyle}
              className={styles['password-login-label']}
              htmlFor="password-login">
              Password
            </label>
            <input
              type="password"
              className="password-login-input"
              onFocus={() => {
                changeElem('password-login-div', setPasswordStyle, new_settings);
              }}
              onInput={() => {
                changeElem('password-login-div', setPasswordStyle, new_settings);
              }}
              onBlur={passwordBlurHandler}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles['login-line1']}>
            <button className={styles['login-button']}>Log in</button>
            <button className={styles['forgot-button']}>Forgot password?</button>
          </div>
          <div className={styles['login-line2']}>
            <Link to="/signup">
              <button className={styles['create-button']}>Create new account</button>
            </Link>
          </div>
        </div>
      </form>
      <div className={styles['error']}>{error}</div>
    </div>
  );
}

export default LoginForm;
