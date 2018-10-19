const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig')
const { authenticate } = require('./middlewares');
const jwtKey = require('../_secrets/keys').jwtKey;
module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;
  // console.log(credentials)
  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      const token = generateToken({ username: credentials.username });
      res.status(201).json({ newUserId: id, token });
      console.log('did is succeed?')
      console.log(token)
    })
    .catch(err => {
      console.log('is this the error?')
      res.status(500).json(err);
      console.log(err)
    });
}

function login(req, res) {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ welcome: user.username, token });
      } else {
        res.status(401).json({ message: 'you shall not pass!' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user) {
  const jwtPayload = {
    ...user,
  };
  const jwtOptions = {
    expiresIn: '1m',
  };

  console.log('token from process.env', jwtKey);
  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}