import { snakeToCamelCase } from 'json-style-converter/es5';
import { Store as RNC } from 'react-notifications-component';
import { push } from 'redux-first-history';

import { postRegister, postLogin, postLogout } from '_api/auth';
import { login, logout } from '_store/actions/user';

import { dispatchError } from '_utils/api';

export const attemptLogin = (user) => (dispatch) =>
  // Makes an api call to server and does validaiton there
  postLogin(user)
    // if successful, dispatch will
    .then((data) => {
      dispatch(login(snakeToCamelCase(data.user)));

      RNC.addNotification({
        title: 'Success!',
        message: data.message,
        type: 'success',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      });

      dispatch(push('/dashboard'));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptRegister = (newUser) => (dispatch) =>
  postRegister(newUser)
    .then((data) => {
      RNC.addNotification({
        title: 'Success!',
        message: data.message,
        type: 'success',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      });

      return dispatch(attemptLogin(newUser));
    })
    .then(() => dispatch(push('/settings')))
    .catch(dispatchError(dispatch));

export const attemptLogout = () => (dispatch) =>
  postLogout()
    .then((data) => {
      dispatch(logout());

      RNC.addNotification({
        title: 'Success!',
        message: data.message,
        type: 'success',
        container: 'top-right',
        animationIn: ['animated', 'fadeInRight'],
        animationOut: ['animated', 'fadeOutRight'],
        dismiss: {
          duration: 5000,
        },
      });

      dispatch(push('/login'));
      return data;
    })
    .catch(dispatchError(dispatch));
