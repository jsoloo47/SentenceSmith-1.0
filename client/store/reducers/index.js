import { combineReducers } from 'redux';

import user from './user';
import projects from './projects';

const createRootReducer = (routerReducer) =>
  combineReducers({
    router: routerReducer,
    user,
    projects,
  });

export default createRootReducer;
