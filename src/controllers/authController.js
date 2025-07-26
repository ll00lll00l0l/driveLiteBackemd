const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signUpUser = async (req, res) => {
  try {
    const { user_name, email, password, enabled } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: 'User already exists',
      });
    }

    const newUser = new User({
      user_name,
      email,
      password,
      enabled,
    });

    await newUser.save();

    const payload = { user: { id: newUser.id } };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      status: true,
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      name: newUser.user_name,
      user_id: newUser._id,
      role_id: newUser.role_id,
      enabled: newUser.enabled,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'Invalid Credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: 'Invalid Credentials',
      });
    }

    const payload = { user: { id: user.id } };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      status: true,
      message: 'Login Successful',
      accessToken,
      refreshToken,
      name: user.user_name,
      user_id: user._id,
      role_id: user.role_id,
      enabled: user.enabled,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
const getNewAccessToken = (req, res) => {
  const authHeader = req.headers['authorization'];
  const refreshToken = authHeader && authHeader.split(' ')[1];

  if (!refreshToken) {
    return res.status(401).json({ status: false, message: "Refresh token missing" });
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ status: false, message: "Invalid refresh token" });
      }

      const payload = { user: { id: decoded.user.id } };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      res.status(200).json({
        status: true,
        accessToken,
        message: "New access token generated"
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = {
  signUpUser,
  loginUser,
  getNewAccessToken,
};
