import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const postProject = (info) =>
  request
    .post('/api/projects')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);
export const getProjects = () =>
  request.get('/api/projects').then(handleSuccess).catch(handleError);

// API point that will be called when doing two actions, creating a post (btn or template) or opening an exisiting post
// 11/4/22 getProject is working and returns the project by ID
export const getProject = (id) =>
  request.get(`/api/projects/${id}`).then(handleSuccess).catch(handleError);

export const putTitle = (info) =>
  request
    .put('/api/projects')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const deleteProject = (info) =>
  request
    .delete('/api/projects')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);
