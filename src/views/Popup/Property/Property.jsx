/* global chrome */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Layout from '../components/Layout.jsx';
import Container from '../components/Container';
import { getPropertyInfo } from '../../../utils/content.js';
import styles from './Property.module.css';

const Property = () => {
  const [data, setData] = useState({});

  const handleClick = () => {
    chrome.tabs.create({
      url: 'https://www.facebook.com/groups/highperformancepropertyinvestment',
    });
  };

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyInfo = await getPropertyInfo();
      setData(propertyInfo);
    };

    fetchProperty();
  }, []);

  return (
    <Layout btn="login">
      <Container style={{ backgroundColor: 'white' }}>
        <main className={styles.unauthed}>
          <h1
            className={styles.title}
          >{`${data.address}, ${data.suburb}`}</h1>
          <p className={styles.msg}>
            We have loaded up to 81 "POWER" data points for this
          </p>
          <p className={styles.text}>
            <Link className={styles.link} to="/login">
              LOGIN
            </Link>
            <span>OR</span>
            <Link
              onClick={handleClick}
              className={styles.link}
              to="#"
            >
              GET AN INVITE
            </Link>
            <span>TO VIEW</span>
          </p>
          <Link className={styles.btn} to="/login">
            LOGIN
          </Link>
          <Link className={styles.btn} to="/registration">
            JOIN WAITLIST
          </Link>
        </main>
      </Container>
    </Layout>
  );
};

export default Property;
