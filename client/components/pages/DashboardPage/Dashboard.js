import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';
import R from 'ramda';

import './styles.scss';

import Templates from '_components/organisms/Templates';
import Projects from '_components/organisms/Projects';

import Section from 'react-bulma-companion/lib/Section';

import { attemptGetProjects } from '_store/thunks/projects';

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    } else {
      dispatch(attemptGetProjects())
        .catch(R.identity)
        .then(() => setLoading(false));
    }
  }, [dispatch, user]);

  return (
    <div className="root">
      <Section className="dash">
        <div className="container">
          <div className="col-left">
            <Templates />
          </div>
          <div className="col-right">
            <Projects />
          </div>
        </div>
      </Section>
    </div>
  );
}
