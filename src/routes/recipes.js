const multer = require('multer');
const express = require('express');
const router = new express.Router();

const { 
  createRecipeController, 
  readRecipeController,
  readRecipesController, 
  updateRecipeController, 
  deleteRecipeController } = require('../controllers/recipeController');

const upload = multer({
  storage: multer.memoryStorage()
});

router.post('/recipe', upload.single('image'), createRecipeController);
router.get('/recipe/:recipeId', readRecipeController);
router.get('/recipes', readRecipesController);
router.patch('/recipe/:recipeId', updateRecipeController);
router.delete('/recipe/:recipeId', deleteRecipeController);

module.exports = router;