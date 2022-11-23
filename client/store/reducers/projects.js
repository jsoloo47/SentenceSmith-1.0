import update from 'immutability-helper';
import R from 'ramda';

import {
  SET_PROJECTS,
  SET_PROJECT,
  ADD_PROJECT,
  TOGGLE_FAVORITE_PROJECT,
  UPDATE_TITLE,
  REMOVE_PROJECT,
} from '_store/actions/projects';

import { LOGOUT_USER } from '_store/actions/user';

export function project(
  state = {
    title: 'Untitled',
  },
  action
) {
  switch (action.type) {
    case ADD_PROJECT:
      return update(state, {
        id: { $set: action.id },
        title: { $set: action.title },
        createdAt: { $set: action.createdAt },
      });
    case TOGGLE_FAVORITE_PROJECT:
      return update(state, {
        favorite: { $apply: (x) => !x },
      });
    case UPDATE_TITLE:
      return update(state, {
        title: { $set: action.title },
      });
    default:
      return state;
  }
}

export default function projects(state = [], action) {
  const index = R.findIndex(R.propEq('id', action.id), state);
  const updatedAtIndex = {
    $splice: [[index, 1, project(state[index], action)]],
  };

  switch (action.type) {
    case SET_PROJECTS:
      return update(state, { $set: action.projects });
    case SET_PROJECT:
      return update(state, { $set: action.project });
    case ADD_PROJECT:
      return update(state, { $push: [project(undefined, action)] });

    // Only updating get and put (Set and Add)
    case TOGGLE_FAVORITE_PROJECT:
      return update(state, updatedAtIndex);
    case UPDATE_TITLE:
      return update(state, updatedAtIndex);
    case REMOVE_PROJECT:
      return update(state, { $splice: [[index, 1]] });
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
