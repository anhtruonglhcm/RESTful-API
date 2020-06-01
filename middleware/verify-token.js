const jwt = require('jsonwebtoken');

// eslint-disable-next-line func-names
module.exports = function (req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  const checkBearer = 'Bearer ';

  if (token) {
    if (token.startsWith(checkBearer)) {
      token = token.slice(checkBearer.length, token.length);
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          msg: ' failed to authorization',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({ status: false, msg: 'please provided a token' });
  }
};
