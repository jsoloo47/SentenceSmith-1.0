import { snakeToCamelCase } from 'json-style-converter/es5';
import R from 'ramda';
import { push } from 'redux-first-history';

import {
  getProjects,
  getProject,
  postProject,
  deleteProject,
  putTitle,
} from '_api/projects';

import { getResponse } from '_api/gpt3';

import {
  setProjects,
  setProject,
  setResponse,
  removeProject,
  updateTitle,
} from '_store/actions/projects';

import { dispatchError } from '_utils/api';

export const attemptGetProjects = () => (dispatch) => {
  console.log('attemptGetProjects');
  return getProjects()
    .then((data) => {
      const projects = R.map(
        (project) =>
          R.omit(['Id'], R.assoc('id', project._id, snakeToCamelCase(project))),
        data.projects
      );

      dispatch(setProjects(projects));
      return data.projects;
    })
    .catch(dispatchError(dispatch));
};

export const attemptGetProject = (id) => (dispatch) =>
  getProject(id)
    .then((data) => {
      dispatch(push(`/project/${id}`));
      dispatch(setProject(data));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptNewPrjct = () => (dispatch) =>
  postProject()
    .then((data) => {
      const url = data.project._id;
      console.log(data.message);
      dispatch(push(`/project/${url}`));
      dispatch(setProject(data.project._id));
    })
    .catch(dispatchError(dispatch));

export const attemptGetResponse = (prompt, id) => (dispatch) =>
  getResponse(prompt, id)
    .then((data) => {
      // TODO update UI, and store response in DB note: Only save last 10 responses and manage state
      // dispatch(setRespose(data.rez));
      return data.rez;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateTitle = (id, title) => (dispatch) =>
  putTitle({ id, title })
    .then((data) => {
      dispatch(updateTitle({ id, title }));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptDeleteProject = (id) => (dispatch) =>
  deleteProject({ id })
    .then((data) => {
      dispatch(removeProject(id));
      return data;
    })
    .catch(dispatchError(dispatch));
