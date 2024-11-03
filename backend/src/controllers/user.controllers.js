const express = require('express');
const User = require('../models/user.models');
const { authenticate } = require('../middlewares/authenticate');
const { authorise } = require('../middlewares/authorise');

const router = express.Router();

router.get(
  '/find-all-users',
  authenticate,
  authorise(['user', 'admin']),
  async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
