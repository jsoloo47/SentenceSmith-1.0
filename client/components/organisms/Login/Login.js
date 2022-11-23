import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';

import Box from 'react-bulma-companion/lib/Box';
import Block from 'react-bulma-companion/lib/Block';
import Title from 'react-bulma-companion/lib/Title';
import Control from 'react-bulma-companion/lib/Control';
import Button from 'react-bulma-companion/lib/Button';
import Checkbox from 'react-bulma-companion/lib/Checkbox';

import useKeyPress from '_hooks/useKeyPress';
import { attemptLogin } from '_store/thunks/auth';
import FormInput from '_components/molecules/FormInput';

import styles from './styles.module.css';

export default function Login() {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setRemember(true);
      setUsername(username);
    }
  }, []);

  const login = () => {
    const userCredentials = { username, password };

    if (remember) {
      localStorage.setItem('username', username);
    }

    dispatch(attemptLogin(userCredentials)).catch(R.identity);
  };

  useKeyPress('Enter', login);

  const rememberMe = () => {
    localStorage.removeItem('username');
    setRemember(!remember);
  };

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  return (
    <Box className="login-container">
      <Title size="1">Login</Title>
      <Block className="info">
        Enter your details to log into an existant account, or continue with a
        Google/Github account.
      </Block>
      <Button className="social-btn">
        <FontAwesomeIcon icon={faGoogle} size="2xl" />
        <span>Continue with Google</span>
      </Button>
      <Button className="social-btn">
        <FontAwesomeIcon icon={faGithub} size="2xl" />
        <span>Continue with Github</span>
      </Button>
      <div className="middle-container">
        <div className="dotted"></div>
        <span>OR</span>
        <div className="dotted"></div>
      </div>
      <FormInput
        onChange={updateUsername}
        placeholder="Username"
        value={username}
        leftIcon={faUser}
      />
      <FormInput
        onChange={updatePassword}
        placeholder="Password"
        value={password}
        leftIcon={faLock}
        type="password"
      />
      <Block className="check-recov">
        <Checkbox>
          <input type="checkbox" onChange={rememberMe} checked={remember} />
          <span>&nbsp; Remember me</span>
        </Checkbox>
        <Link to="/recovery">Forgot your password?</Link>
      </Block>
      <Control className="is-clearfix">
        <Button className="is-pulled-right login-btn" onClick={login}>
          Login
        </Button>
      </Control>
    </Box>
  );
}
