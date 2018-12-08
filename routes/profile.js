const express = require('express');
const controller = require('../controllers/profile');
const passport = require('passport');
const router = express.Router();

router.get('/profile', passport.authenticate('jwt', {session: false}), controller.profile);

module.exports = router;
