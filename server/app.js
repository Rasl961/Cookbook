const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const recipeRoutes = require('./routes/recipes');
const app = express();

mongoose.connect(keys.MONGO_URI)
  .then(() => console.log('Connected to mongoDB'))
  .catch(error => console.log('Connection to mongoDB failed'));

require('./middleware/passport')(passport);
app.use(passport.initialize());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/account', profileRoutes);
app.use('/api/recipes', recipeRoutes);

module.exports = app;
