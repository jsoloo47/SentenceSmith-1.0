const express = require('express');
const path = require('path');

const auth = require('./auth');
const rateLimit = require('./rateLimit');
const user = require('./user');
const users = require('./users');
const projects = require('./projects');
const gpt3 = require('./gpt3');

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/rl', rateLimit);
router.use('/api/user', user);
router.use('/api/users', users);
router.use('/api/projects', projects);
router.use('/api/gpt3', gpt3);

router.get('/api/tags', (req, res) => {
  res.send([
    'MERN',
    'Node',
    'Express',
    'Webpack',
    'React',
    'Redux',
    'Mongoose',
    'Bulma',
    'Fontawesome',
    'Ramda',
    'ESLint',
    'Jest',
  ]);
});

router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = router;
