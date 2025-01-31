const { getRecipe } = require('../services/recipeScraperService');

const scrapeRecipeByUrl = async (url) => {
  try {
    const recipe = await getRecipe(url);
    return recipe;
  } catch (error) {
    console.error(`Error scraping recipe: ${error.message}`);
    throw new Error();
  }
};

module.exports = {
  scrapeRecipeByUrl
}