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
  time: {
    prepTime: {
      days: String,
      hours: String,
      minutes: String
    },
    cookTime: {
      days: String,
      hours: String,
      minutes: String
    }
  },
  ingredients: [],
  steps: [],
  image: String,
  lastMade: Date,
  rating: {
    type: Number,
    default: 0
  }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;