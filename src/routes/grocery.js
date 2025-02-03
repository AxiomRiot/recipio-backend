const express = require('express');
const router = new express.Router();

const { generateGroceryListController } = require('../controllers/groceryListController');

router.get('/groceryList', generateGroceryListController);

module.exports = router;