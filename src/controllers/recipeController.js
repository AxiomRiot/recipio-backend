const { createRecipe, readRecipe, updateRecipe, deleteRecipe } = require('../services/recipeService');

const createRecipeController = async (req, res) => {
  
  const url = req.body.url;

  if(!url) {
    return res.status(400).send('Recipe URL is required');
  }

  try {

    const recipe = await createRecipe(url);
    res.status(201).send(recipe);

  } catch (error) {
    console.error(`Error creating recipe: ${error.message}`);
    res.status(500).send('Error creating recipe');
  }

}

const readRecipeController = async (req, res) => {

  const recipeId = req.params.id;
  
  if(!recipeId) {
    return res.status(400).send('Recipe ID is required');
  }

  try {

    const recipe = await readRecipe(recipeId);
    res.send(recipe);

  } catch (error) {
    console.error(`Error reading recipe: ${error.message}`);
    res.status(500).send('Error reading recipe');
  }

}

const updateRecipeController = async (req, res) => {
  
  const recipeId = req.params.id;
  const updates = req.body;
  
  if(!recipeId || !updates) {
    return res.status(400).send('Recipe ID and update data are required');
  }

  try {

    const recipe = await updateRecipe( recipeId, updates );
    res.send(recipe);

  } catch (error) {
    console.error(`Error updating recipe: ${error.message}`);
    res.status(500).send('Error updating recipe');
  }

}

const deleteRecipeController = async (req, res) => {
  
  const recipeId = req.params.id;

  if(!recipeId) {
    return res.status(400).send('Recipe ID is required');
  }

  try {

    await deleteRecipe(recipeId);
    res.status(201).send();

  } catch (error) {
    console.error(`Error deleting recipe: ${error.message}`);
    res.status(500).send('Error deleting recipe');
  }

}

module.exports = {
  createRecipeController,
  readRecipeController,
  updateRecipeController,
  deleteRecipeController
}