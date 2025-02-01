const mongoose = require('mongoose');
const Recipe = require('../../src/models/recipeModel');

const recipeOneId = new mongoose.Types.ObjectId();
const recipeOne = {
  _id: recipeOneId,
  title: "Test Recipe 1",
  description: "Test Recipe 1 Description",
  servings: "1",
  duration: {
    days: "1",
    hours: "1",
    minutes: "1"
  },
  ingredients: [
    "Test Ingredient 1"
  ],
  steps: [
    "Test Step 1"
  ]
}

const setupDatabase = async () => {
  await Recipe.deleteMany();

  await new Recipe(recipeOne).save();
}

module.exports = {
  recipeOneId,
  recipeOne,
  setupDatabase
}