const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({email: req.body.email});
  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      //Generate token
      const token = jwt.sign({
        name: candidate.name,
        userId: candidate._id
      }, keys.JWT, {expiresIn: 60 * 60});

      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      res.json({
        returnMessage: 'Wrong email or password.'
      });
    }
  } else {
    res.status(404).json({
      returnMessage: 'User is not found.'
    });
  }
}

module.exports.register = async function (req, res) {

  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    res.status(409).json({
      returnMessage: 'The user with this email already exits in system.'
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      res.json({
        returnMessage: 'Something went wrong.'
      });
    }
  }
}
