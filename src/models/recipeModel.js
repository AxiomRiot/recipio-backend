const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  servings: {
    type: String,
    required: true
  },
  duration: {
    days: String,
    hours: String,
    minutes: String
  },
  ingredients: [],
  steps: [],
  image: Buffer
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;