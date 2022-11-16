const bcrypt = require('bcryptjs');
const User = require('../models/user-model');

const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ username, password: hashPassword });

    req.session.user = newUser;

    res.status(201).json({
      status: 'succes',
      data: { user: newUser },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 'fail' });
  }
};

const logIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Incorrect username or password',
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      return res.status(400).json({
        status: 'fail',
        message: 'Incorrect username or password',
      });
    }

    req.session.user = user;

    res.status(200).json({
      status: 'succes',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 'fail' });
  }
};

module.exports = {
  signUp,
  logIn,
};
