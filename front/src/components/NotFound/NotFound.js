import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import styles from './NotFound.module.css';

function NotFound() {
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == '/') {
      navigate('/home', { replace: true });
    }
  }, []);

  return <div>Page Not Found</div>;
}

export default NotFound;
