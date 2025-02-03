const Recipe = require('../models/recipeModel');
const { meatKeywords, produceKeywords, dairyKeywords, pantryKeywords } = require('../utils/groceryCategories');

function categorizeIngredient(ingredient) {
  const lowerCaseIngredient = ingredient.toLowerCase();
  if( meatKeywords.some(keyword => lowerCaseIngredient.includes(keyword)) ) {
    return 'meat';
  } else if( produceKeywords.some(keyword => lowerCaseIngredient.includes(keyword)) ) {
    return 'produce';
  } else if( dairyKeywords.some(keyword => lowerCaseIngredient.includes(keyword)) ) {
    return 'dairy';
  } else if ( pantryKeywords.some(keyword => lowerCaseIngredient.includes(keyword)) ) {
    return 'pantry';
  } else {
    return 'other';
  }
}

async function fetchRecipe(recipeId) {
  const response = await Recipe.findById(recipeId);
  return response;
}

const generateGroceryList = async (recipes) => {

  const categorizedGroceryList = {
    meat: [],
    produce: [],
    dairy: [],
    pantry: [],
    other: []
  }

  for(const recipeId of recipes) {
    const recipe = await fetchRecipe(recipeId);

    if(!recipe) {
      throw new Error(`Recipe with id ${recipeId} not found, skipping adding to grocery list`);
    }

    recipe.ingredients.forEach( element => {
      categorizedGroceryList[ categorizeIngredient(element) ].push(element);
    });
  }

  return categorizedGroceryList;
}

module.exports = {
  generateGroceryList
}