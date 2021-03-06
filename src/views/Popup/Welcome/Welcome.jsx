/* global chrome */
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Container from '../components/Container';
import { isAuthenticated } from '../../../utils/authentication.js';
import styles from './Welcome.module.css';

function Welcome(props) {
  const getToken = async () => {
    const isLogin = await isAuthenticated();
    if (isLogin) {
      props.history.push('/dashboard');
    }
  };
  getToken();

  const handleClick = () => {
    chrome.tabs.create({
      url: 'https://www.facebook.com/groups/highperformancepropertyinvestment',
    });
  };

  return (
    <React.Fragment>
      <Layout btn="login">
        <div className={styles.msg}>
          <div className={styles.left}></div>
          <div className={styles.mid}>
            <p className={styles.text}>as we are still in beta...</p>
            <p className={styles.text}>
              you must be invited to create an account.
            </p>
          </div>
          <div className={styles.right}></div>
        </div>
        <Container title="HOW DO I GET INVITE?">
          <p className={styles.tips}>
            BE INVITED BY ANOTHER "POWER" USER
          </p>
          <Link
            className={`${styles.btn} ${styles.signup}`}
            to="/registration"
          >
            Join Waitlist
          </Link>
          <div className={styles.divider}>
            <span>OR</span>
          </div>
          <Link onClick={handleClick} className={styles.btn} to="#">
            Join Group
          </Link>
        </Container>
      </Layout>
    </React.Fragment>
  );
}

export default Welcome;
