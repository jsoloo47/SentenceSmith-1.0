import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-transition-group';

import { push } from 'redux-first-history';
import R from 'ramda';

import Section from 'react-bulma-companion/lib/Section';

import Input from '_components/molecules/gpt3Input';
import ResponseList from '_components/organisms/ResponseList';

import { attemptGetProject, attemptUpdateTitle } from '_store/thunks/projects';

import './styles.scss';

export default function ProjectPage() {
  const dispatch = useDispatch();

  const { user } = useSelector(R.pick(['user']));
  const { projects } = useSelector(R.pick(['projects']));
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [bgOpacity, setBgOpacity] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    } else {
      dispatch(attemptGetProject(id))
        .catch(R.identity)
        .then(() => setLoading(false));
    }
  }, [dispatch, user]);

  const updateText = (e) => setCurrentText(e.target.value);
  const editTodo = () => setEdit(true);
  const updateTitle = () => {
    if (currentText) {
      dispatch(attemptUpdateTitle(id, currentText)).then(() => setEdit(false));
    }
  };

  console.log(bgOpacity);
  if (!loading) {
    return (
      <div className="pg-container">
        <Section className="title_container">
          {edit ? (
            <input
              className="project_title-edit"
              value={currentText}
              onChange={updateText}
              onBlur={updateTitle}
              placeholder="Untitled"
            />
          ) : (
            <h1 className="project_title" onClick={editTodo}>
              {projects.title}
            </h1>
          )}
        </Section>
        <Section className="project-body">
          <Input setData={setData} setBgOpacity={setBgOpacity} />
          <ResponseList resList={projects.resList} data={data} />
        </Section>
      </div>
    );
  }
}

// Everytime the a response is generated, it is saved in the DB, I need to make so that everytime it is generated, the UI updates with the last 10.
// Ideas:
// 1. Could be a hook that only rerenders the response list and makes an api call get the responseList based on an ID?

// 2. I can set the initial state to resList and then upon making a request, it will slice the last index and push the new res.
