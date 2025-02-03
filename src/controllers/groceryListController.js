const { generateGroceryList } = require('../services/groceryListService');
const logger = require('../utils/loggers');

const generateGroceryListController = async (req, res) => {
  
  try {

    const recipeList = req.body.recipes;

    if(!recipeList || !Array.isArray(recipeList)) {
      return res.status(400).send('Recipe List is required');
    }

    const groceryList = await generateGroceryList(recipeList);
    res.send(groceryList);

  } catch (error) {
    logger.error(`Error getting grocery list: ${error.message}`);
    res.status(500).send('Error creating grocery list');
  }

}

module.exports = {
  generateGroceryListController
}