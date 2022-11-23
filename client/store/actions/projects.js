export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_PROJECT = 'SET_PROJECT';
export const ADD_PROJECT = 'ADD_PROJECT';
export const TOGGLE_FAVORITE_PROJECT = 'TOGGLE_FAVORITE_PROJECT';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const INCREMENT_PROJECT_ID = 'INCREMENT_PROJECT_ID';

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  projects,
});

export const setProject = (project) => ({
  type: SET_PROJECT,
  project,
});

export const addProject = ({ id, title, createdAt }) => ({
  type: ADD_PROJECT,
  createdAt,
  id,
  title,
});

// Only updating get and put (Set and Add)
export const toggleFavoriteProject = (id) => ({
  type: TOGGLE_FAVORITE_PROJECT,
  id,
});

export const updateTitle = ({ id, title }) => ({
  type: UPDATE_TITLE,
  id,
  title,
});

export const removeProject = (id) => ({
  type: REMOVE_PROJECT,
  id,
});
