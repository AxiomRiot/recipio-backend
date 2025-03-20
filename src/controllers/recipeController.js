const { createRecipe, readRecipe, updateRecipe, deleteRecipe } = require('../services/recipeService');
const logger = require('../utils/loggers');

const createRecipeController = async (req, res) => {
  
  const url = req.body.url;

  logger.info("RecipeController received a create operation");

  if(!url) {
    return res.status(400).send('Recipe URL is required');
  }

  try {

    const recipe = await createRecipe(url);

    res.status(201).send(recipe);

  } catch (error) {
    logger.error(`Error creating recipe: ${error.message}`);
    res.status(500).send('Error creating recipe');
  }
}

const readRecipeController = async (req, res) => {

  logger.info("RecipeController received a read operation");

  const recipeId = req.params.recipeId;
  
  if(!recipeId) {
    return res.status(400).send('Recipe ID is required');
  }

  try {

    const recipe = await readRecipe(recipeId);
    res.send(recipe);

  } catch (error) {
    logger.error(`Error reading recipe: ${error.message}`);
    res.status(500).send(`Error reading recipe: ${error.message}`);
  }

}

const updateRecipeController = async (req, res) => {

  logger.info("RecipeController received a update operation");
  
  const recipeId = req.params.recipeId;
  const updates = req.body;
  
  if(!recipeId || !updates) {
    return res.status(400).send('Recipe ID and update data are required');
  }

  try {

    const recipe = await updateRecipe( recipeId, updates );
    res.send(recipe);

  } catch (error) {
    logger.error(`Error updating recipe: ${error.message}`);
    res.status(500).send('Error updating recipe');
  }

}

const deleteRecipeController = async (req, res) => {

  logger.info("RecipeController received a delete operation");
  
  const recipeId = req.params.recipeId;

  if(!recipeId) {
    return res.status(400).send('Recipe ID is required');
  }

  try {

    await deleteRecipe(recipeId);
    res.status(201).send();

  } catch (error) {
    logger.error(`Error deleting recipe: ${error.message}`);
    res.status(500).send('Error deleting recipe');
  }

}

module.exports = {
  createRecipeController,
  readRecipeController,
  updateRecipeController,
  deleteRecipeController
}