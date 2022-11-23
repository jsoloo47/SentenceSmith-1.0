import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import R from 'ramda';

import Section from 'react-bulma-companion/lib/Section';

import styles from './styles.module.css';

import Features from './Features';
import CTA from './CTA';
import Hero from './Hero';

export default function WelcomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/dashboard'));
    }
  }, [dispatch, user]);

  return (
    <div className={styles.root}>
      <Section>
        <Hero />
        <Features />
        <CTA />
      </Section>
    </div>
  );
}
