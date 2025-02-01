const express = require('express');
const router = new express.Router();

const { 
  createRecipeController, 
  readRecipeController, 
  updateRecipeController, 
  deleteRecipeController } = require('../controllers/recipeController');

router.post('/recipe', createRecipeController);
router.get('/recipe/:recipeId', readRecipeController);
router.patch('/recipe/:recipeId', updateRecipeController);
router.delete('/recipe/:recipeId', deleteRecipeController);

module.exports = router;