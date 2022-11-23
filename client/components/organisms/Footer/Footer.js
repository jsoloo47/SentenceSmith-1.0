import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import Footer from 'react-bulma-companion/lib/Footer';
import Container from 'react-bulma-companion/lib/Container';

import styles from './styles.module.css';

export default function FooterComponent() {
  const year = new Date().getFullYear();

  const { user } = useSelector(R.pick(['user']));

  const [auth, setAuth] = useState(!R.isEmpty(user));

  useEffect(() => {
    setAuth(!R.isEmpty(user));
  }, [user]);

  return (
    <Footer className={styles.root}>
      <Container className="footer-container">
        <div className="col1">
          <h4>Social Media</h4>
          <FontAwesomeIcon icon={faInstagram} size="2xl" />
          <FontAwesomeIcon icon={faTwitter} size="2xl" />
          <FontAwesomeIcon icon={faLinkedin} size="2xl" />
        </div>
        <div className="col2">
          <h4>Company</h4>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>
        <div className="col3">
          <h4>Get in touch</h4>
          <a href="https://github.com/jsoloo47/SentenceSmith">
            <p>GitHub Repo</p>
          </a>
          <a href="https://openai.com/api/">
            <p>API</p>
          </a>
          <a href="https://juansolano.netlify.app/">
            <p>Portfolio</p>
          </a>
        </div>
        <div className="col4">
          <p>All rights reserved</p>
        </div>
        {auth ? <div>I am logged in</div> : null}
      </Container>
    </Footer>
  );
}
