const { 
  createRecipe, 
  readRecipe,
  readRecipes, 
  updateRecipe, 
  deleteRecipe 
} = require('../services/recipeService');
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
    res.status(500).send(`Error creating recipe: ${error.message}`);
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

const readRecipesController = async(req, res) => {
  const page = Number.parseInt(req.query.page);
  const pageSize = Number.parseInt(req.query.pageSize);

  if(!page) {
    return res.status(400).send('Page is required');
  }

  if(!pageSize) {
    return res.status(400).send('Page size is required');
  }

  logger.info(`RecipeController received a recipes request for page: ${page} and page size: ${pageSize}`);

  try {
    const recipes = await readRecipes(page, pageSize);
    res.send(recipes);

  } catch (error) {
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
  readRecipesController,
  updateRecipeController,
  deleteRecipeController
}