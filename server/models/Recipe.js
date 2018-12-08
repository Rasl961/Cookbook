const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_created: {
    type: String
  },
});

module.exports = mongoose.model('recipes', recipeSchema);
