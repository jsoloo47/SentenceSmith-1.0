import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';

import Button from 'react-bulma-companion/lib/Button';
import Title from 'react-bulma-companion/lib/Title';
import Field from 'react-bulma-companion/lib/Field';
import Control from 'react-bulma-companion/lib/Control';
import Icon from 'react-bulma-companion/lib/Icon';
import Input from 'react-bulma-companion/lib/Input';
import Label from 'react-bulma-companion/lib/Label';
import Help from 'react-bulma-companion/lib/Help';

import useKeyPress from '_hooks/useKeyPress';
import { postCheckUsername } from '_api/users';
import { validateUsername, validatePassword } from '_utils/validation';
import { attemptRegister } from '_store/thunks/auth';

import styles from './styles.module.css';

export default function Register() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const checkPassword = (newUsername, newPassword) => {
    const { valid, message } = validatePassword(newUsername, newPassword);

    setPasswordValid(valid);
    setPasswordMessage(message);
  };

  const checkUsername = (newUsername) => {
    const { valid, message } = validateUsername(newUsername);

    if (valid) {
      setUsernameMessage('Checking username...');
      setUsernameAvailable(false);

      postCheckUsername(newUsername)
        .then((res) => {
          setUsernameAvailable(res.available);
          setUsernameMessage(res.message);
        })
        .catch(R.identity);
    } else {
      setUsernameAvailable(valid);
      setUsernameMessage(message);
    }
  };

  const updateUsername = (newUserName) => {
    setUsername(newUserName);
    checkPassword(newUserName, password);
  };

  const handleUsernameChange = (e) => {
    updateUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPassword(username, e.target.value);
  };

  const register = () => {
    if (usernameAvailable && passwordValid) {
      const newUser = {
        username,
        password,
      };

      dispatch(attemptRegister(newUser)).catch(R.identity);
    }
  };

  useKeyPress('Enter', register);

  return (
    <section className="signup-container">
      <Title size="1">Sign Up</Title>
      <div className="info">
        Create an account below or continue with a Google/Github account.
      </div>
      <Field>
        <Label htmlFor="username">Username</Label>
        <Control iconsRight>
          <Input
            id="username"
            placeholder="Username"
            color={
              username ? (usernameAvailable ? 'success' : 'warning') : undefined
            }
            value={username}
            onChange={handleUsernameChange}
          />
          {username && (
            <Icon
              size="small"
              align="right"
              color={usernameAvailable ? 'success' : 'warning'}
            >
              <FontAwesomeIcon
                icon={usernameAvailable ? faCheck : faTriangleExclamation}
              />
            </Icon>
          )}
        </Control>
        {username && (
          <Help color={usernameAvailable ? 'success' : 'warning'} size="xl">
            {usernameMessage}
          </Help>
        )}
      </Field>
      <Field>
        <Label htmlFor="password">Password</Label>
        <Control iconsRight>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            color={
              password ? (passwordValid ? 'success' : 'danger') : undefined
            }
            value={password}
            onChange={handlePasswordChange}
          />
          {password && (
            <Icon
              size="small"
              align="right"
              color={passwordValid ? 'success' : 'danger'}
            >
              <FontAwesomeIcon
                icon={passwordValid ? faCheck : faTriangleExclamation}
              />
            </Icon>
          )}
        </Control>
        {password && (
          <Help color={passwordValid ? 'success' : 'danger'}>
            {passwordMessage}
          </Help>
        )}
      </Field>
      <p className="has-space-below acc-alr">
        Already a member?&nbsp;
        <Link to="/login">Login</Link>
      </p>
      <div className="has-text-right">
        <Button
          className="signup-btn"
          onClick={register}
          disabled={!passwordValid || !usernameAvailable}
        >
          Create Account
        </Button>
      </div>
      <div className="middle-container">
        <div className="dotted"></div>
        <span>OR</span>
        <div className="dotted"></div>
      </div>
      <Button className="social-btn">
        <FontAwesomeIcon icon={faGoogle} size="2xl" />
        <span>Continue with Google</span>
      </Button>
      <Button className="social-btn">
        <FontAwesomeIcon icon={faGithub} size="2xl" />
        <span>Continue with Github</span>
      </Button>
    </section>
  );
}
