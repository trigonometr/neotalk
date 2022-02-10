import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthorized, loginRequest, signupRequestPromise } from '../../services/api';
import { changeElem } from '../../services/changer';

import styles from './SignupForm.module.css';

import logo from '../../img/NeoTalkLogo.svg';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../actions/auth';

function SignupForm() {
  const default_settings = {
    style: {
      padding: '0 0 0 0',
      position: 'absolute',
      transform: 'translateY(10%)',

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
      transform: 'translateY(-50%)',
      fontSize: '11px',
    },
    color: 'rgba(169, 188, 255, 1)',
  };

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [phoneEmailStyle, setPhoneEmailStyle] = useState(default_settings.style);
  const [usernameStyle, setUsernameStyle] = useState(default_settings.style);
  const [passwordStyle, setPasswordStyle] = useState(default_settings.style);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const phoneEmailBlurHandler = (e) => {
    if (e.target.value === '') {
      changeElem('phone_email-signup-div', setPhoneEmailStyle, default_settings);
    }
  };
  const usernameBlurHandler = (e) => {
    if (e.target.value === '') {
      changeElem('username-signup-div', setUsernameStyle, default_settings);
    }
  };
  const passwordBlurHandler = (e) => {
    if (e.target.value === '') {
      changeElem('password-signup-div', setPasswordStyle, default_settings);
    }
  };

  const submitSignupForm = async (e) => {
    e.preventDefault();

    if (!(username && password)) {
      setError('Username and password fields may not be blank');
      return;
    }
    if (!/\w+@\w+.\w+/.test(email)) {
      setError('Incorrect email address');
      return;
    }

    try {
      const response = await signupRequestPromise({ username, password, email });
      const data = await response.json();

      if (!response.ok) {
        setError(data.detail);
      } else {
        loginRequest({ username, password }, navigate, setError);
        dispatch(setAuth(true));
      }
    } catch (err) {
      //
    }
  };

  useEffect(async () => {
    const result = await isAuthorized();
    if (result) {
      navigate('/home', { replace: true });
    }
  }, []);

  return (
    <div className={styles['signup-form']}>
      <div className={styles['signup-logo']}>
        <Link to="/home">
          <img className={styles['signup-NeoTalk']} src={logo} alt="logo"></img>
        </Link>
      </div>
      <div className={styles['signup-form-container']}>
        <div className={styles['signup']}>
          <h1>Sign up</h1>
        </div>
        <form>
          <div className={styles['inner-signup-form-container']}>
            <div
              className={'phone_email-signup-div ' + styles['signup-form-group']}
              onClick={() => {
                document.getElementsByClassName('phone_email-signup-div')[0].focus();
              }}>
              <label htmlFor="phone_email-signup" style={phoneEmailStyle}>
                Email
              </label>
              <input
                type="text"
                className={styles['phone_email-signup']}
                onFocus={() => {
                  changeElem('phone_email-signup-div', setPhoneEmailStyle, new_settings);
                }}
                onInput={() => {
                  changeElem('phone_email-signup-div', setPhoneEmailStyle, new_settings);
                }}
                onBlur={phoneEmailBlurHandler}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className={'username-signup-div ' + styles['signup-form-group']}
              onClick={() => {
                document.getElementsByClassName('username-signup-div')[0].focus();
              }}>
              <label htmlFor="username-signup" style={usernameStyle}>
                Username
              </label>
              <input
                type="text"
                className={styles['username-signup']}
                onFocus={() => {
                  changeElem('username-signup-div', setUsernameStyle, new_settings);
                }}
                onInput={() => {
                  changeElem('username-signup-div', setUsernameStyle, new_settings);
                }}
                onBlur={usernameBlurHandler}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div
              className={'password-signup-div ' + styles['signup-form-group']}
              onClick={() => {
                document.getElementsByClassName('password-signup-div')[0].focus();
              }}>
              <label htmlFor="password-signup" style={passwordStyle}>
                Password
              </label>
              <input
                type="password"
                className={styles['password-signup']}
                onFocus={() => {
                  changeElem('password-signup-div', setPasswordStyle, new_settings);
                }}
                onInput={() => {
                  changeElem('password-signup-div', setPasswordStyle, new_settings);
                }}
                onBlur={passwordBlurHandler}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <label className={styles['birth-date-div']} htmlFor="date">
              Date of birth
            </label>
            <input
              className={styles['date']}
              type="date"
              name="birth-date"
              defaultValue={'1900-01-01'}
              min="1900-01-01"
              max="2022-01-01"
            />
            <div className={styles['signup-line1']}>
              <button className={styles['continue-button']} onClick={submitSignupForm}>
                Continue
              </button>
            </div>
            <div className={styles['signup-line2']}>
              <a className={styles['signed-up']} href="../login">
                Already signed up?
              </a>
            </div>
          </div>
        </form>
        <div className={styles['error']}>{error}</div>
      </div>
    </div>
  );
}

export default SignupForm;
