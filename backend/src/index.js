const express = require('express');
const connect = require('./configs/db');
const dotenv = require('dotenv');

const userController = require('./controllers/user.controllers');
const { register, login } = require('./controllers/auth.controller');
dotenv.config();

var cors = require('cors');

const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.post('/api/users/signup', register);
app.post('/api/users/signin', login);

app.use('/api/users', userController);

app.listen(port, async () => {
  try {
    await connect();
    console.log('mongodb connected');
    console.log(`listening on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
