const express = require('express');
const router = new express.Router();
const Recipe = require('../models/recipeModel');
const { scrapeRecipeByUrl } = require('../controllers/recipeScraperController');

router.post('/recipe', async(req, res) => {

  try {
    const scrapedRecipe = await scrapeRecipeByUrl(req.body.url);
    const recipe = new Recipe(scrapedRecipe);
    await recipe.save();

    res.status(201).send({recipe});

  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;