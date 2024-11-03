const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRECT_KEY);
};
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: 'Email already exists!' });
    }
    user = await User.create(req.body);

    const token = generateToken(user);
    // return res.status(200).send(token);
    return res
      .cookie('jwt', token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .status(200)
      .send({
        user,
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: 'Wrong email or password!' });
    }
    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).send({ message: 'Wrong email or password!' });
    }

    // if matches
    const token = generateToken(user);
    // return res.status(200).send(token);
    return res
      .cookie('jwt', token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .status(200)
      .send({
        id: user._id,
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { register, login };
