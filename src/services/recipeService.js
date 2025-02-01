const Recipe = require('../models/recipeModel');
const { getRecipe } = require('./recipeScraperService');

const createRecipe = async (recipeUrl) => {

  try {

    const scrapedRecipe = await getRecipe(recipeUrl);

    const recipe = new Recipe(scrapedRecipe);
    await recipe.save();

    return recipe;

  } catch (error) {
    console.error(`Error creating recipe: ${error.message}`);
    throw error;
  }

}

const readRecipe = async (recipeId) => {
  
  try {

    const recipe = await Recipe.findById(recipeId);

    if(!recipe) {
      throw new Error(`Recipe with given id ${recipeId} not found; read failed!`);
    }

    return recipe;

  } catch (error) {
    console.error(`Error reading recipe: ${error.message}`);
    throw error;
  }

}

const updateRecipe = async (recipeId, updates) => {
  
  const updateKeys = Object.keys(updates)
  const allowedUpdates = ['title', 'description', 'servings', 'duration', 'ingredients', 'steps'];
  const isAllowed = updateKeys.every((update) => allowedUpdates.includes(update));

  if(!isAllowed) {
    throw new Error('Invalid updates!');
  }

  try {

    const updatedRecipe = Recipe.findByIdAndUpdate(recipeId, updates, { new: true });

    if(!updatedRecipe) {
      throw new Error(`Recipe with given id ${recipeId} not found; update failed!`);
    }

    return updatedRecipe;

  } catch (error) {
    console.error(`Error updating recipe: ${error.message}`);
    throw error;
  }

}

const deleteRecipe = async (recipeId) => {
  
  try {

    const recipe = await Recipe.findByIdAndDelete(recipeId);

    if(!recipe) {
      throw new Error(`Recipe with given id ${recipeId} not found; deletion failed!`);
    }

    return recipe;

  } catch (error) {
    console.error(`Error deleting recipe: ${error.message}`);
    throw error;
  }

}

module.exports = {
  createRecipe,
  readRecipe,
  updateRecipe,
  deleteRecipe
}