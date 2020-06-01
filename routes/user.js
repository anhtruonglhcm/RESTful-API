const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require('../middleware/verify-token');

router.post('/user/singup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({
      status: false,
      msg: ' please in put email and password',
    });
  } else {
    try {
      const user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      await user.save();
      const token = jwt.sign(user.toJSON(), process.env.SECRET, { expiresIn: 604800 });
      res.status(200).json({
        success: true,
        token,
        msg: ' created successfully',
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
});

router.get('/user/singup', verifyToken, async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findOne({ _id: req.decoded._id });
    if (user) {
      res.json({
        status: true,
        user,
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: err.message });
  }
});

router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({
        status: false,
        msg: 'user not found',
      });
    } else if (user.comparePassword(req.body.password)) {
      const token = jwt.sign(user.toJSON(), process.env.SECRET, { expiresIn: 604800 }); // 1 tuan
      res.json({
        status: true,
        token,
      });
    } else {
      res.status(403).json({
        status: false,
        msg: 'password wrong',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
    });
  }
});
module.exports = router;
