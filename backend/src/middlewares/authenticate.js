const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRECT_KEY, function (err, decoded) {
      if (err) {
        return reject(err);
      }

      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  let decoded;
  try {
    decoded = await verifyToken(token);
    console.log(decoded);
    // return res.status(200).send(decoded);
    // next();
  } catch (error) {
    return res.status(500).send({ message: 'Authorisation token not found.' });
  }

  req.user = decoded.user;
  return next();
};

module.exports = { authenticate };
